<?php
session_start();
if (!$_SESSION) {
    header('Location: ../../dist/views/login.php?error=true&message=No puedes acceder a esta pagina, inicia sesion con un usuario valido!&title=Acceso denegado');
    exit;
}
if (
    isset($_POST['nombre']) &&
    isset($_POST['email']) &&
    isset($_POST['pass']) &&
    !empty($_POST['nombre']) &&
    !empty($_POST['email']) &&
    !empty($_POST['pass'])
) {
    $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $pass = $_POST['pass'];
    $hash = password_hash($pass, PASSWORD_BCRYPT);
    require_once '../../models/MySQL.php';
    $mysql = new MySQL();
    $mysql->conectar();
    try {
        $sql = "INSERT INTO usuarios (nombre_usuario, correo_usuario, password_usuario, estado_usuario) VALUES (:nombre, :correo, :pass, 'Activo');";
        $stmt = $mysql->getConexion()->prepare($sql);
        $stmt->bindParam(":nombre", $nombre, PDO::PARAM_STR);
        $stmt->bindParam(":correo", $email, PDO::PARAM_STR);
        $stmt->bindParam(":pass", $hash, PDO::PARAM_STR);
        $stmt->execute();
        //? Retorno de datos aplicando JSON
        header("Content-Type: application/json");
        echo json_encode(['success' => true, 'message' => 'Empleado creado exitosamente!']);
    } catch (\Throwable $th) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Error al crear empleado', 'error' => $th]);
    };
} else {
    header("Content-Type: application/json");
    echo json_encode(['success' => false, 'message' => 'Faltan Datos']);
}
