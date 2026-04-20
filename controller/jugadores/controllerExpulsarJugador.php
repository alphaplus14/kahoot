<?php
require_once __DIR__ . '/../../includes/auth.php';
header('Content-Type: application/json');
requireActiveUserJson();
csrf_validate();

$idJugador = filter_input(INPUT_POST, 'id_jugador', FILTER_VALIDATE_INT);
$idPartida = filter_input(INPUT_POST, 'id_partida', FILTER_VALIDATE_INT);
$pinPost   = filter_input(INPUT_POST, 'pin', FILTER_VALIDATE_INT);

if ($idJugador === false || $idJugador === null || $idJugador < 1) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
    exit;
}

$hasIdPartida = $idPartida !== false && $idPartida !== null && $idPartida > 0;
$hasPin       = $pinPost !== false && $pinPost !== null && $pinPost >= 100000 && $pinPost <= 999999;

if (!$hasIdPartida && !$hasPin) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Indica id_partida o pin']);
    exit;
}

$idUsuario = (int)($_SESSION['id_usuario'] ?? 0);
if ($idUsuario < 1) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Sesión inválida']);
    exit;
}

require_once __DIR__ . '/../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
$pdo = $mysql->getConexion();

try {
    $sqlPorId = "SELECT id_partida, estado_partida
                 FROM partidas
                 WHERE id_partida = :id_partida
                   AND estado_partida = 'Esperando'
                   AND (
                        usuarios_id_usuario = :id_usuario
                     OR usuarios_id_usuario IS NULL
                     OR usuarios_id_usuario = 0
                   )
                 LIMIT 1";
    $sqlPorPin = "SELECT id_partida, estado_partida
                  FROM partidas
                  WHERE pin_partida = :pin
                    AND estado_partida = 'Esperando'
                    AND (
                         usuarios_id_usuario = :id_usuario
                      OR usuarios_id_usuario IS NULL
                      OR usuarios_id_usuario = 0
                    )
                  LIMIT 1";

    $partida = null;
    if ($hasIdPartida) {
        try {
            $st = $pdo->prepare($sqlPorId);
            $st->bindValue(':id_partida', $idPartida, PDO::PARAM_INT);
            $st->bindValue(':id_usuario', $idUsuario, PDO::PARAM_INT);
            $st->execute();
            $partida = $st->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            if (stripos($e->getMessage(), 'Unknown column') === false) {
                throw $e;
            }
            $st = $pdo->prepare(
                "SELECT id_partida, estado_partida
                 FROM partidas
                 WHERE id_partida = :id_partida
                   AND estado_partida = 'Esperando'
                 LIMIT 1"
            );
            $st->bindValue(':id_partida', $idPartida, PDO::PARAM_INT);
            $st->execute();
            $partida = $st->fetch(PDO::FETCH_ASSOC);
        }
    } elseif ($hasPin) {
        try {
            $st = $pdo->prepare($sqlPorPin);
            $st->bindValue(':pin', $pinPost, PDO::PARAM_INT);
            $st->bindValue(':id_usuario', $idUsuario, PDO::PARAM_INT);
            $st->execute();
            $partida = $st->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            if (stripos($e->getMessage(), 'Unknown column') === false) {
                throw $e;
            }
            $st = $pdo->prepare(
                "SELECT id_partida, estado_partida
                 FROM partidas
                 WHERE pin_partida = :pin
                   AND estado_partida = 'Esperando'
                 LIMIT 1"
            );
            $st->bindValue(':pin', $pinPost, PDO::PARAM_INT);
            $st->execute();
            $partida = $st->fetch(PDO::FETCH_ASSOC);
        }
    }

    $idPartidaResuelta = $partida ? (int)$partida['id_partida'] : 0;

    if (!$partida) {
        http_response_code(403);
        echo json_encode([
            'success' => false,
            'message' => 'No puedes expulsar jugadores: partida no encontrada, ya iniciada o sin permiso.',
        ]);
        exit;
    }

    $del = $pdo->prepare(
        'DELETE FROM jugadores
         WHERE id_jugador = :id_jugador
           AND partidas_id_partida = :id_partida
         LIMIT 1'
    );
    $del->bindValue(':id_jugador', $idJugador, PDO::PARAM_INT);
    $del->bindValue(':id_partida', $idPartidaResuelta, PDO::PARAM_INT);
    $del->execute();

    if ($del->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Jugador no encontrado en esta partida']);
        exit;
    }

    echo json_encode(['success' => true, 'message' => 'Jugador expulsado del lobby']);
} catch (Throwable $e) {
    error_log('controllerExpulsarJugador: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al expulsar jugador']);
} finally {
    $mysql->desconectar();
}
