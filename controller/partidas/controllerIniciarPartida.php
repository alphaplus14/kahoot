<?php
require_once __DIR__ . '/../../includes/auth.php';
header('Content-Type: application/json');
requireActiveUserJson();
csrf_validate();

require_once __DIR__ . '/../../models/MySQL.php';

$pin = filter_input(INPUT_POST, 'pin', FILTER_VALIDATE_INT, ['options' => ['min_range' => 100000, 'max_range' => 999999]]);
if ($pin === false || $pin === null) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'PIN inválido']);
    exit;
}

$idUsuario = (int)($_SESSION['id_usuario'] ?? 0);
if ($idUsuario < 1) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Sesión inválida']);
    exit;
}

$mysql = new MySQL();
$mysql->conectar();

try {
    $pdo = $mysql->getConexion();
    $ok  = false;

    try {
        $stmt = $pdo->prepare(
            "UPDATE partidas
             SET estado_partida = 'Jugando'
             WHERE pin_partida = :pin
               AND estado_partida = 'Esperando'
               AND usuarios_id_usuario = :uid"
        );
        $stmt->bindValue(':pin', $pin, PDO::PARAM_INT);
        $stmt->bindValue(':uid', $idUsuario, PDO::PARAM_INT);
        $stmt->execute();
        $ok = $stmt->rowCount() > 0;
    } catch (PDOException $e) {
        if (stripos($e->getMessage(), 'Unknown column') === false) {
            throw $e;
        }
        $stmtLegacy = $pdo->prepare(
            "UPDATE partidas
             SET estado_partida = 'Jugando'
             WHERE pin_partida = :pin
               AND estado_partida = 'Esperando'"
        );
        $stmtLegacy->bindValue(':pin', $pin, PDO::PARAM_INT);
        $stmtLegacy->execute();
        $ok = $stmtLegacy->rowCount() > 0;
    }

    if ($ok) {
        try {
            $stPid = $pdo->prepare('SELECT id_partida FROM partidas WHERE pin_partida = :pin LIMIT 1');
            $stPid->bindValue(':pin', $pin, PDO::PARAM_INT);
            $stPid->execute();
            $rowPid = $stPid->fetch(PDO::FETCH_ASSOC);
            if ($rowPid) {
                $stReset = $pdo->prepare(
                    'UPDATE jugadores SET preguntas_respondidas = 0,
                        ultima_pregunta_indice = NULL,
                        ultima_respuesta_letra = NULL
                     WHERE partidas_id_partida = :pid'
                );
                $stReset->bindValue(':pid', (int)$rowPid['id_partida'], PDO::PARAM_INT);
                $stReset->execute();
            }
        } catch (Throwable $e) {
            if (stripos($e->getMessage(), 'Unknown column') === false) {
                error_log('IniciarPartida reset progreso jugadores: ' . $e->getMessage());
            }
        }
        echo json_encode(['success' => true, 'message' => 'Partida iniciada. Los jugadores pueden jugar.']);
        exit;
    }

    http_response_code(409);
    echo json_encode([
        'success' => false,
        'message' => 'No se pudo iniciar: la partida ya comenzó, finalizó o no te pertenece.',
    ]);
} catch (Throwable $e) {
    error_log('controllerIniciarPartida: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al iniciar la partida']);
} finally {
    $mysql->desconectar();
}
