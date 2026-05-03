<?php
// Endpoint server-side que valida la respuesta del jugador y calcula los
// puntos de esa pregunta. El cliente nunca recibe la respuesta correcta
// antes de responder, y los puntos SIEMPRE se calculan aquí.
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/muerte_subita.php';
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

$indiceEsperado = (int)($_SESSION['indice_pregunta_actual'] ?? 0);
if ($indice !== $indiceEsperado) {
    http_response_code(409);
    echo json_encode(['success' => false, 'message' => 'Orden de pregunta inválido']);
    exit;
}

if ($tiempoRestante === false || $tiempoRestante === null) {
    $tiempoRestante = 0.0;
}
$tiempoRestante = max(0.0, min((float)$tiempoRestante, (float)$segundos));

require_once __DIR__ . '/../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
$pdo = $mysql->getConexion();

try {
    $stPart = $pdo->prepare('SELECT estado_partida FROM partidas WHERE id_partida = :id LIMIT 1');
    $stPart->bindValue(':id', $idPartidaSesion, PDO::PARAM_INT);
    $stPart->execute();
    $rowPart = $stPart->fetch(PDO::FETCH_ASSOC);
    if (!$rowPart || ($rowPart['estado_partida'] ?? '') !== 'Jugando') {
        http_response_code(410);
        echo json_encode([
            'success'            => false,
            'partida_finalizada' => true,
            'message'            => 'La partida fue finalizada por el organizador.',
        ]);
        exit;
    }

    $idJugador = (int)($_SESSION['id_jugador'] ?? 0);
    if ($idJugador > 0) {
        try {
            $stEj = $pdo->prepare(
                'SELECT COALESCE(en_juego, 1) FROM jugadores
                 WHERE id_jugador = :id AND partidas_id_partida = :pid LIMIT 1'
            );
            $stEj->bindValue(':id', $idJugador, PDO::PARAM_INT);
            $stEj->bindValue(':pid', $idPartidaSesion, PDO::PARAM_INT);
            $stEj->execute();
            $ejRow = $stEj->fetchColumn();
            if ($ejRow !== false && (int)$ejRow === 0) {
                http_response_code(403);
                echo json_encode([
                    'success'   => false,
                    'eliminado' => true,
                    'message'   => 'Has sido eliminado de la muerte súbita.',
                ]);
                exit;
            }
        } catch (Throwable $e) {
            if (stripos($e->getMessage(), 'Unknown column') === false) {
                throw $e;
            }
        }
    }

    $pregunta = $preguntas[$indice];
    $respuestaCorrecta = (string)$pregunta['respuesta_correcta'];

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

    if ($letra !== '' && !in_array($letra, ['A', 'B', 'C', 'D'], true)) {
        $letra = '';
    }

    $esCorrecta     = ($letra !== '' && $letra === $letraCorrecta);
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

    $nuevoInd       = (int)$_SESSION['indice_pregunta_actual'];
    $totalPreguntas = count($preguntas);
    $eliminadosRonda = 0;
    $jugadorEliminado = false;

    if ($idJugador > 0) {
        $puntosSesion = (int)$_SESSION['puntos_partida'];
        $letraStore   = $letra === '' ? '' : $letra;
        try {
            $updP = $pdo->prepare(
                'UPDATE jugadores SET puntaje_jugador = :p,
                    preguntas_respondidas = :pr,
                    ultima_pregunta_indice = :ui,
                    ultima_respuesta_letra = :ul
                 WHERE id_jugador = :id AND partidas_id_partida = :pid'
            );
            $updP->bindValue(':p', $puntosSesion, PDO::PARAM_INT);
            $updP->bindValue(':pr', $indice + 1, PDO::PARAM_INT);
            $updP->bindValue(':ui', $indice, PDO::PARAM_INT);
            $updP->bindValue(':ul', $letraStore, PDO::PARAM_STR);
            $updP->bindValue(':id', $idJugador, PDO::PARAM_INT);
            $updP->bindValue(':pid', $idPartidaSesion, PDO::PARAM_INT);
            $updP->execute();
        } catch (Throwable $e) {
            if (stripos($e->getMessage(), 'Unknown column') !== false) {
                try {
                    $updP = $pdo->prepare(
                        'UPDATE jugadores SET puntaje_jugador = :p
                         WHERE id_jugador = :id AND partidas_id_partida = :pid'
                    );
                    $updP->bindValue(':p', $puntosSesion, PDO::PARAM_INT);
                    $updP->bindValue(':id', $idJugador, PDO::PARAM_INT);
                    $updP->bindValue(':pid', $idPartidaSesion, PDO::PARAM_INT);
                    $updP->execute();
                } catch (Throwable $e2) {
                    error_log('registrarRespuesta puntaje: ' . $e2->getMessage());
                }
            } else {
                error_log('registrarRespuesta puntaje: ' . $e->getMessage());
            }
        }
    }

    $modo      = $_SESSION['modo_juego'] ?? 'normal';
    $intervalo = (int)($_SESSION['intervalo_eliminacion'] ?? 0);

    if (
        $modo === 'muerte_subita'
        && $intervalo > 0
        && $nuevoInd > 0
        && $nuevoInd < $totalPreguntas
        && ($nuevoInd % $intervalo === 0)
    ) {
        try {
            $eliminadosRonda = kahoot_muerte_aplicar_eliminacion(
                $pdo,
                $idPartidaSesion,
                $nuevoInd,
                $totalPreguntas,
                $intervalo
            );
        } catch (Throwable $e) {
            error_log('muerte_subita eliminación: ' . $e->getMessage());
        }
    }

    if ($idJugador > 0) {
        try {
            $stF = $pdo->prepare(
                'SELECT COALESCE(en_juego, 1) FROM jugadores WHERE id_jugador = :id LIMIT 1'
            );
            $stF->bindValue(':id', $idJugador, PDO::PARAM_INT);
            $stF->execute();
            $ej = $stF->fetchColumn();
            if ($ej !== false && (int)$ej === 0) {
                $jugadorEliminado = true;
            }
        } catch (Throwable $e) {
            if (stripos($e->getMessage(), 'Unknown column') === false) {
                throw $e;
            }
        }
    }

    echo json_encode([
        'success'             => true,
        'letra_correcta'      => $letraCorrecta,
        'es_correcta'         => $esCorrecta,
        'puntos_pregunta'     => $puntosPregunta,
        'puntos_total'        => (int)$_SESSION['puntos_partida'],
        'eliminado'           => $jugadorEliminado,
        'muerte_subita'       => $modo === 'muerte_subita',
        'eliminados_en_ronda' => $eliminadosRonda,
    ]);
} catch (Throwable $e) {
    error_log('controllerRegistrarRespuesta: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al registrar la respuesta']);
} finally {
    $mysql->desconectar();
}
