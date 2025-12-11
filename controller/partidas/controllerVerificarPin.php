<?php
session_start();
header('Content-Type: application/json');


require_once '../../models/MySQL.php';

try {
    $mysql = new MySQL();
    $mysql->conectar();

    $stmt = $mysql->getConexion()->prepare("SELECT * FROM partidas WHERE pin_partida = :pin_partida");
    $pinPartida = filter_input(INPUT_POST, 'pinIngresado', FILTER_SANITIZE_NUMBER_INT);
    $stmt->bindParam(':pin_partida', $pinPartida, PDO::PARAM_INT);
    $stmt->execute();
    $partida = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($partida) {
        echo json_encode([
            'success' => true,
            'data' => $partida
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'PIN inválido'
        ]);
    }
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
