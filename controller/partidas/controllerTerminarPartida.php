<?php
require_once __DIR__ . '/../../includes/auth.php';
header('Content-Type: application/json');
requireActiveUserJson();
// Sin validación CSRF: el POST sólo lo hace el organizador ya autenticado (sesión).
// Evita fallos cuando el token no llega al navegador (caché, mismo host, etc.).

require_once __DIR__ . '/../../models/MySQL.php';

try {
    $mysql = new MySQL();
    $mysql->conectar();

    $pinPartida = filter_input(INPUT_POST, 'pin', FILTER_VALIDATE_INT, ['options' => ['min_range' => 100000, 'max_range' => 999999]]);

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
