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

$idJugador = (int)($_SESSION['id_jugador'] ?? 0);

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

    $_SESSION['modo_juego']          = 'normal';
    $_SESSION['intervalo_eliminacion'] = 0;
    try {
        $stModo = $pdo->prepare('SELECT modo_juego, intervalo_eliminacion FROM partidas WHERE id_partida = :id LIMIT 1');
        $stModo->bindValue(':id', $idPartida, PDO::PARAM_INT);
        $stModo->execute();
        $mr = $stModo->fetch(PDO::FETCH_ASSOC);
        if ($mr) {
            $_SESSION['modo_juego'] = (string)($mr['modo_juego'] ?? 'normal');
            if (isset($mr['intervalo_eliminacion']) && $mr['intervalo_eliminacion'] !== null) {
                $_SESSION['intervalo_eliminacion'] = (int)$mr['intervalo_eliminacion'];
            }
        }
    } catch (Throwable $e) {
        if (stripos($e->getMessage(), 'Unknown column') === false) {
            throw $e;
        }
    }

    if ($idJugador > 0) {
        try {
            $stEj = $pdo->prepare(
                'SELECT COALESCE(en_juego, 1) FROM jugadores
                 WHERE id_jugador = :jid AND partidas_id_partida = :pid LIMIT 1'
            );
            $stEj->bindValue(':jid', $idJugador, PDO::PARAM_INT);
            $stEj->bindValue(':pid', $idPartida, PDO::PARAM_INT);
            $stEj->execute();
            $ej = $stEj->fetchColumn();
            if ($ej !== false && (int)$ej === 0) {
                http_response_code(403);
                echo json_encode([
                    'success'    => false,
                    'eliminado'  => true,
                    'message'    => 'Fuiste eliminado de la muerte súbita.',
                ]);
                exit;
            }
        } catch (Throwable $e) {
            if (stripos($e->getMessage(), 'Unknown column') === false) {
                throw $e;
            }
        }
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
