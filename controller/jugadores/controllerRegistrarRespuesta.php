<?php
// Endpoint server-side que valida la respuesta del jugador y calcula los
// puntos de esa pregunta. El cliente nunca recibe la respuesta correcta
// antes de responder, y los puntos SIEMPRE se calculan aquí.
require_once __DIR__ . '/../../includes/auth.php';
header('Content-Type: application/json');
csrf_validate();

if (empty($_SESSION['idPartida']) || empty($_SESSION['preguntas_juego'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Sesión de juego no válida']);
    exit;
}

$idPartidaSesion = filter_var($_SESSION['idPartida'], FILTER_VALIDATE_INT);
if ($idPartidaSesion === false || $idPartidaSesion === null || $idPartidaSesion < 1) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Partida inválida']);
    exit;
}

require_once __DIR__ . '/../../models/MySQL.php';
$mysqlCheck = new MySQL();
$mysqlCheck->conectar();
try {
    $stPart = $mysqlCheck->getConexion()->prepare(
        'SELECT estado_partida FROM partidas WHERE id_partida = :id LIMIT 1'
    );
    $stPart->bindValue(':id', $idPartidaSesion, PDO::PARAM_INT);
    $stPart->execute();
    $rowPart = $stPart->fetch(PDO::FETCH_ASSOC);
    if (!$rowPart || ($rowPart['estado_partida'] ?? '') !== 'Jugando') {
        http_response_code(410);
        echo json_encode([
            'success'              => false,
            'partida_finalizada'   => true,
            'message'              => 'La partida fue finalizada por el organizador.',
        ]);
        exit;
    }
} finally {
    $mysqlCheck->desconectar();
}

$indice         = filter_input(INPUT_POST, 'indice', FILTER_VALIDATE_INT, ['options' => ['min_range' => 0]]);
$letra          = strtoupper(trim((string)($_POST['letra'] ?? '')));
$tiempoRestante = filter_input(INPUT_POST, 'tiempo_restante', FILTER_VALIDATE_FLOAT);

$preguntas = $_SESSION['preguntas_juego'];
$segundos  = (int)($_SESSION['segundos_pregunta'] ?? 0);

if ($indice === false || $indice === null || !isset($preguntas[$indice])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Índice de pregunta inválido']);
    exit;
}

// Sólo se admite responder a la pregunta actual (previene saltos y reenvíos).
$indiceEsperado = (int)($_SESSION['indice_pregunta_actual'] ?? 0);
if ($indice !== $indiceEsperado) {
    http_response_code(409);
    echo json_encode(['success' => false, 'message' => 'Orden de pregunta inválido']);
    exit;
}

// Acotamos el tiempo reportado: no puede ser mayor al tiempo máximo por
// pregunta ni negativo. Esto evita que un cliente manipulado envíe tiempos
// arbitrariamente grandes.
if ($tiempoRestante === false || $tiempoRestante === null) {
    $tiempoRestante = 0.0;
}
$tiempoRestante = max(0.0, min((float)$tiempoRestante, (float)$segundos));

$pregunta = $preguntas[$indice];
$respuestaCorrecta = (string)$pregunta['respuesta_correcta'];

// Mapa letra -> texto para determinar la letra ganadora a partir del texto
$mapaLetras = [
    'A' => (string)$pregunta['respuesta_A'],
    'B' => (string)$pregunta['respuesta_B'],
    'C' => (string)$pregunta['respuesta_C'],
    'D' => (string)$pregunta['respuesta_D'],
];
$letraCorrecta = '';
foreach ($mapaLetras as $l => $texto) {
    if ($texto === $respuestaCorrecta) {
        $letraCorrecta = $l;
        break;
    }
}

// Validación de la letra enviada: sólo A/B/C/D o vacío (timeout).
if ($letra !== '' && !in_array($letra, ['A', 'B', 'C', 'D'], true)) {
    $letra = '';
}

$esCorrecta    = ($letra !== '' && $letra === $letraCorrecta);
$puntosPregunta = 0;
if ($esCorrecta && $segundos > 0) {
    $puntosPregunta = (int)round((10000 / $segundos) * $tiempoRestante);
}

$_SESSION['puntos_partida']         = (int)($_SESSION['puntos_partida'] ?? 0) + $puntosPregunta;
$_SESSION['indice_pregunta_actual'] = $indiceEsperado + 1;
$_SESSION['respuestas_registradas'][] = [
    'indice'         => $indice,
    'letra_enviada'  => $letra,
    'letra_correcta' => $letraCorrecta,
    'es_correcta'    => $esCorrecta,
    'puntos'         => $puntosPregunta,
];

echo json_encode([
    'success'         => true,
    'letra_correcta'  => $letraCorrecta,
    'es_correcta'     => $esCorrecta,
    'puntos_pregunta' => $puntosPregunta,
    'puntos_total'    => (int)$_SESSION['puntos_partida'],
]);
