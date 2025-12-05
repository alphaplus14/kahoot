<?php
session_start();
if (!$_SESSION) {
    header('Location: ../../dist/login.php?error=true&message=No puedes acceder a esta pagina, inicia sesion con un usuario valido!&title=Acceso denegado');
    exit;
}
require_once '../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
try {
    $resultado = $mysql->efectuarConsulta("SELECT * FROM usuarios WHERE correo_usuario = '$email';");
} catch (\Throwable $th) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Error al verificar email', 'error' => $th]);
};

$bool = true;
if (mysqli_num_rows($resultado) > 0) {
    $bool = false;
}
header("Content-Type: application/json");
echo json_encode($bool);
