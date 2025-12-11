<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['id_usuario'])) {
    http_response_code(401);
    echo json_encode([
        'error' => true,
        'message' => 'Sesión no válida'
    ]);
    exit;
}


require_once '../../models/MySQL.php';

try {
    $mysql = new MySQL();
    $mysql->conectar();

    $idPartida = filter_input(INPUT_GET, 'id_partida', FILTER_VALIDATE_INT);
    if ($idPartida === false || $idPartida === null) {
        http_response_code(400);
        echo json_encode(['error' => true, 'message' => 'ID inválido']);
        exit;
    }

    // Obtener datos de la partida
    $stmt = $mysql->getConexion()->prepare("SELECT * FROM partidas WHERE id_partida = :id");
    $stmt->bindParam(':id', $idPartida, PDO::PARAM_INT);
    $stmt->execute();
    $partida = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$partida) {
        http_response_code(404);
        echo json_encode(['error' => true, 'message' => 'Partida no encontrada']);
        exit;
    }

    // Obtener jugadores de la partida
    $stmtJugadores = $mysql->getConexion()->prepare("SELECT id_jugador, nombre_jugador, puntaje_jugador, ficha_jugador FROM jugadores  WHERE partidas_id_partida = :id ORDER BY puntaje_jugador DESC ");
    $stmtJugadores->bindParam(':id', $idPartida, PDO::PARAM_INT);
    $stmtJugadores->execute();
    $jugadores = $stmtJugadores->fetchAll(PDO::FETCH_ASSOC);

    // Devolver ambos datos
    echo json_encode([
        'success' => true,
        'data' => [
            'partida' => $partida,
            'jugadores' => $jugadores
        ]
    ]);
} catch (Exception $e) {
    echo json_encode([
        "error" => true,
        "message" => $e->getMessage(),
    ]);
} finally {
    // Cierre de conexion
    if (isset($mysql)) {
        $mysql->desconectar();
    }
}
