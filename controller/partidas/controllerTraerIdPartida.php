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

    $pinPartida = filter_input(INPUT_POST, 'pin_partida', FILTER_SANITIZE_NUMBER_INT);


    // Obtener datos de la partida
    $stmt = $mysql->getConexion()->prepare("SELECT * FROM partidas WHERE pin_partida = :pin_partida");
    $stmt->bindParam(':pin_partida', $pinPartida, PDO::PARAM_INT);
    $stmt->execute();
    $partida = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$partida) {
        http_response_code(404);
        echo json_encode(['error' => true, 'message' => 'Partida no encontrada']);
        exit;
    }

    // Devolver ambos datos
    echo json_encode([
        'success' => true,
        'data' => [
            'partida' => $partida
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
