<?php
require_once __DIR__ . '/../../includes/auth.php';
header('Content-Type: application/json');
requireActiveUserJson();

$email = isset($_POST['email']) ? trim($_POST['email']) : '';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(false);
    exit;
}

require_once __DIR__ . '/../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
try {
    $stmt = $mysql->getConexion()->prepare('SELECT 1 FROM usuarios WHERE correo_usuario = :email LIMIT 1');
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->execute();
    echo json_encode($stmt->fetch(PDO::FETCH_ASSOC) === false);
} catch (Throwable $th) {
    error_log('Verify email: ' . $th->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al verificar email']);
} finally {
    $mysql->desconectar();
}
