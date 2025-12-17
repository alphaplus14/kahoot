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

    // Obtener jugadores de la partida
    $stmtJugadores = $mysql->getConexion()->prepare("SELECT id_jugador, nombre_jugador, puntaje_jugador, ficha_jugador FROM jugadores ORDER BY puntaje_jugador DESC limit 10");
    $stmtJugadores->execute();
    $jugadores = $stmtJugadores->fetchAll(PDO::FETCH_ASSOC);

    // Devolver datos
    echo json_encode([
        'success' => true,
        'data' => [
            'jugadores' => $jugadores
        ]
    ]);
} catch (Exception $e) {
    http_response_code(500);
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
