<?php
require_once __DIR__ . '/../../includes/auth.php';
header('Content-Type: application/json; charset=UTF-8');
requireActiveUserJson();

require_once __DIR__ . '/../../models/MySQL.php';

$mysql = null;
try {
    $idPartidaGet = filter_input(INPUT_GET, 'id_partida', FILTER_VALIDATE_INT);
    $pinGet       = filter_input(INPUT_GET, 'pin', FILTER_VALIDATE_INT);

    $hasId  = $idPartidaGet !== false && $idPartidaGet !== null && $idPartidaGet > 0;
    $hasPin = $pinGet !== false && $pinGet !== null && $pinGet >= 100000 && $pinGet <= 999999;

    if (!$hasId && !$hasPin) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Indica id_partida o pin']);
        exit;
    }

    $mysql = new MySQL();
    $mysql->conectar();
    $pdo       = $mysql->getConexion();
    $idUsuario = (int)($_SESSION['id_usuario'] ?? 0);
    $partida   = null;

    $sqlConUsuario = "SELECT id_partida, pin_partida, estado_partida
         FROM partidas
         WHERE estado_partida IN ('Esperando', 'Jugando')
           AND (
                usuarios_id_usuario = :id_usuario
             OR usuarios_id_usuario IS NULL
             OR usuarios_id_usuario = 0
           )
         AND (%s)
         LIMIT 1";

    try {
        if ($hasId) {
            $stmtPartida = $pdo->prepare(sprintf($sqlConUsuario, 'id_partida = :id_partida'));
            $stmtPartida->bindValue(':id_partida', $idPartidaGet, PDO::PARAM_INT);
        } else {
            $stmtPartida = $pdo->prepare(sprintf($sqlConUsuario, 'pin_partida = :pin'));
            $stmtPartida->bindValue(':pin', $pinGet, PDO::PARAM_INT);
        }
        $stmtPartida->bindValue(':id_usuario', $idUsuario, PDO::PARAM_INT);
        $stmtPartida->execute();
        $partida = $stmtPartida->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        if (stripos($e->getMessage(), 'Unknown column') === false) {
            throw $e;
        }
        if ($hasId) {
            $stmtLegacy = $pdo->prepare(
                "SELECT id_partida, pin_partida, estado_partida
                 FROM partidas
                 WHERE id_partida = :id_partida
                   AND estado_partida IN ('Esperando', 'Jugando')
                 LIMIT 1"
            );
            $stmtLegacy->bindValue(':id_partida', $idPartidaGet, PDO::PARAM_INT);
        } else {
            $stmtLegacy = $pdo->prepare(
                "SELECT id_partida, pin_partida, estado_partida
                 FROM partidas
                 WHERE pin_partida = :pin
                   AND estado_partida IN ('Esperando', 'Jugando')
                 LIMIT 1"
            );
            $stmtLegacy->bindValue(':pin', $pinGet, PDO::PARAM_INT);
        }
        $stmtLegacy->execute();
        $partida = $stmtLegacy->fetch(PDO::FETCH_ASSOC);
    }

    if (!$partida) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Partida no encontrada o finalizada']);
        exit;
    }

    $modoJuego = 'normal';
    try {
        $stModo = $pdo->prepare('SELECT modo_juego FROM partidas WHERE id_partida = :id LIMIT 1');
        $stModo->bindValue(':id', (int)$partida['id_partida'], PDO::PARAM_INT);
        $stModo->execute();
        $mrow = $stModo->fetch(PDO::FETCH_ASSOC);
        if ($mrow && isset($mrow['modo_juego'])) {
            $modoJuego = (string)$mrow['modo_juego'];
        }
    } catch (Throwable $e) {
        if (stripos($e->getMessage(), 'Unknown column') === false) {
            throw $e;
        }
    }

    $estadoP   = (string)($partida['estado_partida'] ?? '');
    $filtrarMs = ($modoJuego === 'muerte_subita' && $estadoP === 'Jugando');

    $sqlJug = 'SELECT id_jugador, nombre_jugador, ficha_jugador, puntaje_jugador
         FROM jugadores
         WHERE partidas_id_partida = :id_partida';
    if ($filtrarMs) {
        $sqlJug .= ' AND COALESCE(en_juego, 1) = 1';
    }
    $sqlJug .= ' ORDER BY puntaje_jugador DESC, id_jugador ASC';

    try {
        $stmtJugadores = $pdo->prepare($sqlJug);
        $stmtJugadores->bindValue(':id_partida', (int)$partida['id_partida'], PDO::PARAM_INT);
        $stmtJugadores->execute();
        $jugadores = $stmtJugadores->fetchAll(PDO::FETCH_ASSOC);
    } catch (Throwable $e) {
        if (stripos($e->getMessage(), 'Unknown column') === false) {
            throw $e;
        }
        $stmtJugadores = $pdo->prepare(
            'SELECT id_jugador, nombre_jugador, ficha_jugador, puntaje_jugador
             FROM jugadores
             WHERE partidas_id_partida = :id_partida
             ORDER BY puntaje_jugador DESC, id_jugador ASC'
        );
        $stmtJugadores->bindValue(':id_partida', (int)$partida['id_partida'], PDO::PARAM_INT);
        $stmtJugadores->execute();
        $jugadores = $stmtJugadores->fetchAll(PDO::FETCH_ASSOC);
    }

    echo json_encode(
        [
            'success'    => true,
            'estado'     => $partida['estado_partida'],
            'modo_juego' => $modoJuego,
            'total'      => count($jugadores),
            'jugadores'  => $jugadores,
        ],
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );
} catch (Exception $e) {
    error_log('controllerDatosJugadoresPorPin: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al consultar jugadores']);
} finally {
    if ($mysql !== null) {
        $mysql->desconectar();
    }
}
