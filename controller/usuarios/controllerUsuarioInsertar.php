<?php
require_once __DIR__ . '/../../includes/auth.php';
header('Content-Type: application/json');
requireActiveUserJson();
csrf_validate();

$nombre = isset($_POST['nombre']) ? trim(filter_var($_POST['nombre'], FILTER_SANITIZE_FULL_SPECIAL_CHARS)) : '';
$email  = isset($_POST['email'])  ? trim($_POST['email']) : '';
$pass   = $_POST['pass'] ?? '';

if ($nombre === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($pass) < 4) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
    exit;
}

$hash = password_hash($pass, PASSWORD_BCRYPT);

require_once __DIR__ . '/../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
try {
    $stmt = $mysql->getConexion()->prepare(
        "INSERT INTO usuarios (nombre_usuario, correo_usuario, password_usuario, estado_usuario)
         VALUES (:nombre, :correo, :pass, 'Activo')"
    );
    $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
    $stmt->bindParam(':correo', $email,  PDO::PARAM_STR);
    $stmt->bindParam(':pass',   $hash,   PDO::PARAM_STR);
    $stmt->execute();
    echo json_encode(['success' => true, 'message' => 'Usuario creado exitosamente!']);
} catch (Throwable $th) {
    error_log('Insertar usuario: ' . $th->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al crear Usuario']);
} finally {
    $mysql->desconectar();
}
