<?php
require_once __DIR__ . '/../../includes/auth.php';
header('Content-Type: application/json');

if (empty($_SESSION['idPartida']) || empty($_SESSION['id_jugador'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Sesión de jugador no válida']);
    exit;
}

$idPartida = filter_var($_SESSION['idPartida'], FILTER_VALIDATE_INT);
if ($idPartida === false || $idPartida === null) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Partida inválida']);
    exit;
}

require_once __DIR__ . '/../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();

try {
    $pdo = $mysql->getConexion();
    $stmt = $pdo->prepare(
        'SELECT estado_partida FROM partidas WHERE id_partida = :id LIMIT 1'
    );
    $stmt->bindValue(':id', $idPartida, PDO::PARAM_INT);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Partida no encontrada']);
        exit;
    }

    $idJugadorSesion = (int)($_SESSION['id_jugador'] ?? 0);
    $chk             = $pdo->prepare(
        'SELECT 1 FROM jugadores
         WHERE id_jugador = :jid AND partidas_id_partida = :pid
         LIMIT 1'
    );
    $chk->bindValue(':jid', $idJugadorSesion, PDO::PARAM_INT);
    $chk->bindValue(':pid', $idPartida, PDO::PARAM_INT);
    $chk->execute();
    if ($chk->fetch(PDO::FETCH_ASSOC) === false) {
        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], $params['secure'], $params['httponly']);
        }
        session_destroy();
        echo json_encode([
            'success'   => true,
            'expulsado' => true,
            'message'   => 'El organizador te ha quitado del lobby. Elige un nombre apropiado e intenta de nuevo.',
        ]);
        exit;
    }

    $estadoPartida = (string)($row['estado_partida'] ?? '');
    $eliminadoMs   = false;
    if ($estadoPartida === 'Jugando' && $idJugadorSesion > 0) {
        try {
            $stEj = $pdo->prepare(
                'SELECT COALESCE(en_juego, 1) FROM jugadores
                 WHERE id_jugador = :jid AND partidas_id_partida = :pid LIMIT 1'
            );
            $stEj->bindValue(':jid', $idJugadorSesion, PDO::PARAM_INT);
            $stEj->bindValue(':pid', $idPartida, PDO::PARAM_INT);
            $stEj->execute();
            $ej = $stEj->fetchColumn();
            if ($ej !== false && (int)$ej === 0) {
                $eliminadoMs = true;
            }
        } catch (Throwable $e) {
            if (stripos($e->getMessage(), 'Unknown column') === false) {
                throw $e;
            }
        }
    }
    if ($eliminadoMs) {
        echo json_encode([
            'success'     => true,
            'expulsado'   => false,
            'eliminado_ms'=> true,
            'estado'      => $estadoPartida,
            'nombre_jugador' => $_SESSION['nombreJugador'] ?? '',
            'message'     => 'Has sido eliminado de la muerte súbita.',
        ]);
        exit;
    }

    echo json_encode([
        'success'        => true,
        'expulsado'      => false,
        'eliminado_ms'   => false,
        'estado'         => $row['estado_partida'],
        'nombre_jugador' => $_SESSION['nombreJugador'] ?? '',
    ]);
} catch (Throwable $e) {
    error_log('controllerEstadoPartidaJugador: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al consultar la partida']);
} finally {
    $mysql->desconectar();
}
