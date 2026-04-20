<?php
require_once __DIR__ . '/../../includes/auth.php';
header('Content-Type: application/json');
requireActiveUserJson();
csrf_validate();

$id       = filter_input(INPUT_POST, 'id',   FILTER_VALIDATE_INT);
$nombre   = isset($_POST['nombre']) ? trim(filter_var($_POST['nombre'], FILTER_SANITIZE_FULL_SPECIAL_CHARS)) : '';
$email    = isset($_POST['email'])  ? trim($_POST['email']) : '';
$pass     = $_POST['pass'] ?? '';
$boolPass = filter_input(INPUT_POST, 'bool', FILTER_VALIDATE_BOOLEAN);

if (!$id || $nombre === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $pass === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
    exit;
}

// Si boolPass === false -> hay nueva contraseña que hashear; si true, $pass ya es el hash actual
$hash = $boolPass === false ? password_hash($pass, PASSWORD_BCRYPT) : $pass;

require_once __DIR__ . '/../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
try {
    $stmt = $mysql->getConexion()->prepare(
        'UPDATE usuarios
            SET nombre_usuario   = :nombre,
                correo_usuario   = :correo,
                password_usuario = :pass
          WHERE id_usuario       = :id'
    );
    $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
    $stmt->bindParam(':correo', $email,  PDO::PARAM_STR);
    $stmt->bindParam(':pass',   $hash,   PDO::PARAM_STR);
    $stmt->bindParam(':id',     $id,     PDO::PARAM_INT);
    $stmt->execute();
    echo json_encode(['success' => true, 'message' => 'Usuario actualizado exitosamente!']);
} catch (Throwable $th) {
    error_log('Editar usuario: ' . $th->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al editar Usuario']);
} finally {
    $mysql->desconectar();
}
