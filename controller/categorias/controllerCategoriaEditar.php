<?php
require_once __DIR__ . '/../../includes/auth.php';
header('Content-Type: application/json');
requireActiveUserJson();
csrf_validate();

$id     = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
$nombre = isset($_POST['nombre']) ? trim(filter_var($_POST['nombre'], FILTER_SANITIZE_FULL_SPECIAL_CHARS)) : '';
if (!$id || $nombre === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
    exit;
}

require_once __DIR__ . '/../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
try {
    $stmt = $mysql->getConexion()->prepare('UPDATE categorias SET nombre_categoria = :nombre WHERE id_categoria = :id');
    $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
    $stmt->bindParam(':id',     $id,     PDO::PARAM_INT);
    $stmt->execute();
    echo json_encode(['success' => true, 'message' => 'Categoría actualizada exitosamente!']);
} catch (Throwable $th) {
    error_log('Editar categoría: ' . $th->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al editar Categoría']);
} finally {
    $mysql->desconectar();
}
