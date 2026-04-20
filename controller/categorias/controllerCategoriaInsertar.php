<?php
require_once __DIR__ . '/../../includes/auth.php';
header('Content-Type: application/json');
requireActiveUserJson();
csrf_validate();

$nombre = isset($_POST['nombre']) ? trim(filter_var($_POST['nombre'], FILTER_SANITIZE_FULL_SPECIAL_CHARS)) : '';
if ($nombre === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Faltan datos']);
    exit;
}

require_once __DIR__ . '/../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
try {
    $stmt = $mysql->getConexion()->prepare("INSERT INTO categorias (nombre_categoria, estado_categoria) VALUES (:nombre, 'Activo')");
    $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
    $stmt->execute();
    echo json_encode(['success' => true, 'message' => 'Categoría creada exitosamente!']);
} catch (Throwable $th) {
    error_log('Insertar categoría: ' . $th->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al crear categoría']);
} finally {
    $mysql->desconectar();
}
