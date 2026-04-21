<?php
// Salida voluntaria del lobby: borra el registro del jugador (mismo efecto que expulsar)
// para que desaparezca del roster del organizador y de rankings/detalle de la partida.
require_once __DIR__ . '/../../includes/auth.php';
header('Content-Type: application/json');
csrf_validate();

if (empty($_SESSION['id_jugador']) || empty($_SESSION['idPartida'])) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Sesión de jugador no válida']);
    exit;
}

$idJugador = (int)$_SESSION['id_jugador'];
$idPartida = filter_var($_SESSION['idPartida'], FILTER_VALIDATE_INT);
if ($idPartida === false || $idPartida === null || $idPartida < 1) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Partida inválida']);
    exit;
}

require_once __DIR__ . '/../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
$pdo = $mysql->getConexion();

try {
    $stPart = $pdo->prepare('SELECT estado_partida FROM partidas WHERE id_partida = :id LIMIT 1');
    $stPart->bindValue(':id', $idPartida, PDO::PARAM_INT);
    $stPart->execute();
    $part = $stPart->fetch(PDO::FETCH_ASSOC);
    if (!$part) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Partida no encontrada']);
        exit;
    }

    if (($part['estado_partida'] ?? '') !== 'Esperando') {
        http_response_code(409);
        echo json_encode([
            'success' => false,
            'message' => 'La partida ya no está en espera; no puedes salir del lobby desde aquí.',
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
    $del->bindValue(':id_partida', $idPartida, PDO::PARAM_INT);
    $del->execute();

    $keysJugador = [
        'id_jugador',
        'idPartida',
        'nombreJugador',
        'fichaJugador',
        'pinPartida',
        'preguntas_juego',
        'segundos_pregunta',
        'puntos_partida',
        'indice_pregunta_actual',
        'respuestas_registradas',
        'inicio_pregunta_servidor',
        'juego_id_partida',
    ];
    foreach ($keysJugador as $k) {
        unset($_SESSION[$k]);
    }

    echo json_encode([
        'success' => true,
        'message' => 'Saliste de la sala.',
    ]);
} catch (Throwable $e) {
    error_log('controllerSalirLobbyJugador: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al salir de la sala']);
} finally {
    $mysql->desconectar();
}
