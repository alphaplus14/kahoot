<?php
require_once __DIR__ . '/../../includes/auth.php';
header('Content-Type: application/json');
requireActiveUserJson();

$nombre = isset($_POST['nombre']) ? trim(filter_var($_POST['nombre'], FILTER_SANITIZE_FULL_SPECIAL_CHARS)) : '';
if ($nombre === '') {
    echo json_encode(false);
    exit;
}

require_once __DIR__ . '/../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
try {
    $stmt = $mysql->getConexion()->prepare('SELECT 1 FROM categorias WHERE nombre_categoria = :nombre LIMIT 1');
    $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
    $stmt->execute();
    echo json_encode($stmt->fetch(PDO::FETCH_ASSOC) === false);
} catch (Throwable $th) {
    error_log('Verify nombre categoria: ' . $th->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al verificar nombre']);
} finally {
    $mysql->desconectar();
}
