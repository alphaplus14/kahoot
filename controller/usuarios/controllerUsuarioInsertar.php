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
        $mysql->efectuarConsulta("INSERT INTO usuarios (nombre_usuario, correo_usuario, password_usuario, estado_usuario) VALUES ('$nombre','$email','$hash','Activo');");
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
