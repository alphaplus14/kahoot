<?php
require_once __DIR__ . '/../../includes/auth.php';
header('Content-Type: application/json');

if (empty($_SESSION['idPartida'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Sesión inválida']);
    exit;
}

$idPartida = filter_var($_SESSION['idPartida'], FILTER_VALIDATE_INT);
if ($idPartida === false || $idPartida === null) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'ID de partida inválido']);
    exit;
}

require_once __DIR__ . '/../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();

try {
    $pdo = $mysql->getConexion();
    $stEst = $pdo->prepare('SELECT estado_partida FROM partidas WHERE id_partida = :id LIMIT 1');
    $stEst->bindValue(':id', $idPartida, PDO::PARAM_INT);
    $stEst->execute();
    $estRow = $stEst->fetch(PDO::FETCH_ASSOC);
    if (!$estRow || ($estRow['estado_partida'] ?? '') !== 'Jugando') {
        http_response_code(403);
        echo json_encode([
            'success' => false,
            'message' => 'La partida aún no ha comenzado. Espera a que el organizador pulse Iniciar juego.',
        ]);
        exit;
    }

    $sql = 'SELECT
                partidas.segundos_pregunta_partida,
                c.pregunta,
                c.respuesta_A,
                c.respuesta_B,
                c.respuesta_C,
                c.respuesta_D,
                c.respuesta_correcta
            FROM partidas
            JOIN quiz                ON quiz.partidas_id_partida = partidas.id_partida
            JOIN cuestionario AS c   ON c.id_cuestionario = quiz.cuestionario_id_cuestionario
            WHERE partidas.id_partida = :id_partida';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id_partida', $idPartida, PDO::PARAM_INT);
    $stmt->execute();
    $filas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $segundos = 0;
    $preguntasServidor = []; // copia completa (incluye respuesta_correcta) para uso server-only
    $preguntasCliente  = []; // payload que viaja al cliente (sin respuesta_correcta)
    foreach ($filas as $fila) {
        $segundos = max($segundos, (int)$fila['segundos_pregunta_partida']);
        $preguntasServidor[] = [
            'pregunta'           => $fila['pregunta'],
            'respuesta_A'        => $fila['respuesta_A'],
            'respuesta_B'        => $fila['respuesta_B'],
            'respuesta_C'        => $fila['respuesta_C'],
            'respuesta_D'        => $fila['respuesta_D'],
            'respuesta_correcta' => $fila['respuesta_correcta'],
        ];
        $preguntasCliente[] = [
            'pregunta'                  => $fila['pregunta'],
            'respuesta_A'               => $fila['respuesta_A'],
            'respuesta_B'               => $fila['respuesta_B'],
            'respuesta_C'               => $fila['respuesta_C'],
            'respuesta_D'               => $fila['respuesta_D'],
            'segundos_pregunta_partida' => (int)$fila['segundos_pregunta_partida'],
        ];
    }

    // Estado del juego vive en la sesión: el cliente no puede manipular puntos
    // ni saber la respuesta correcta antes de tiempo.
    $_SESSION['preguntas_juego']         = $preguntasServidor;
    $_SESSION['segundos_pregunta']       = $segundos;
    $_SESSION['puntos_partida']          = 0;
    $_SESSION['indice_pregunta_actual']  = 0;
    $_SESSION['respuestas_registradas']  = [];
    $_SESSION['inicio_pregunta_servidor'] = time();

    echo json_encode($preguntasCliente);
} catch (Throwable $e) {
    error_log('Error cargando preguntas: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al cargar preguntas']);
} finally {
    $mysql->desconectar();
}
