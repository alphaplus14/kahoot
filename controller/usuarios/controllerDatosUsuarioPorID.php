<?php
require_once __DIR__ . '/../../includes/auth.php';
header('Content-Type: application/json');
requireActiveUserJson();

$idUsuario = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
if (!$idUsuario) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'ID inválido']);
    exit;
}

require_once __DIR__ . '/../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
try {
    $stmt = $mysql->getConexion()->prepare('SELECT * FROM usuarios WHERE id_usuario = :idUsuario');
    $stmt->bindParam(':idUsuario', $idUsuario, PDO::PARAM_INT);
    $stmt->execute();
    echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
} catch (Throwable $th) {
    error_log('Datos usuario por ID: ' . $th->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al traer datos de usuario']);
} finally {
    $mysql->desconectar();
}
