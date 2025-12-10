<?php
session_start();
if (!$_SESSION) {
    header('Location: ../../dist/views/login.php?error=true&message=No puedes acceder a esta pagina, inicia sesion con un usuario valido!&title=Acceso denegado');
    exit;
}
header('Content-Type: application/json');
$nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
$pass = $_POST["pass"];
$id = filter_var(($_POST['id']), FILTER_SANITIZE_NUMBER_INT);
$boolPass = filter_var($_POST['bool'], FILTER_VALIDATE_BOOLEAN);
if ($boolPass === false) {
    $hash = password_hash($pass, PASSWORD_BCRYPT);
} else {
    $hash = $pass;
}
require_once '../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
try {
    $sql = "UPDATE usuarios SET nombre_usuario = :nombre, correo_usuario = :correo, password_usuario = :pass WHERE id_usuario = :id;";
    $stmt = $mysql->getConexion()->prepare($sql);
    $stmt->bindParam(":nombre", $nombre, PDO::PARAM_STR);
    $stmt->bindParam(":correo", $email, PDO::PARAM_STR);
    $stmt->bindParam(":pass", $hash, PDO::PARAM_STR);
    $stmt->bindParam(":id", $id, PDO::PARAM_STR);
    $stmt->execute();
    //? Retorno de datos aplicando JSON
    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'message' => 'Usuario actualizado exitosamente!']);
} catch (\Throwable $th) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Error al editar Usuario!', 'error' => $th]);
};
