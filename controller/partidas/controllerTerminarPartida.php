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

    $pinPartida = filter_input(INPUT_POST, 'pin', FILTER_SANITIZE_NUMBER_INT);

    if (!$pinPartida) {
        echo json_encode([
            "error" => true,
            "message" => "PIN no recibido"
        ]);
        exit;
    }

    // actualizar el estado de la partida 
    $stmt = $mysql->getConexion()->prepare("update partidas set estado_partida = 'Finalizada' where pin_partida = :pin");
    $stmt->bindParam(':pin', $pinPartida, PDO::PARAM_INT);
    $stmt->execute();

    if ($stmt->rowCount() === 0) {
        echo json_encode([
            "error" => true,
            "message" => "No se encontro la partida o Partida Finalizada previamente"
        ]);
        exit;
    }

    echo json_encode([
        "success" => true,
        "message" => "Partida finalizada correctamente"

    ]);
} catch (Exception $e) {
    echo json_encode([
        "error" => true,
        "message" => $e->getMessage(),
    ]);
} finally {
    if (isset($mysql)) {
        $mysql->desconectar();
    }
}
