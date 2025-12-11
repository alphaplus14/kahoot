<?php
session_start();
if (!$_SESSION) {
    header('Location: ../../dist/login.php?error=true&message=No puedes acceder a esta pagina, inicia sesion con un usuario valido!&title=Acceso denegado');
    exit;
}
require_once '../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();

$nombreCategoria = $_POST['nombre'];

try {
    $sql = "SELECT * FROM categorias WHERE nombre_categoria = '$nombreCategoria';";
    $stmt = $mysql->getConexion()->prepare($sql);
    $stmt->execute();
} catch (\Throwable $th) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Error al traer datos de categoria por ID', 'error' => $th]);
}
$datos = $stmt->fetch(PDO::FETCH_ASSOC);
$bool = true;
if ($datos != false) {
    $bool = false;
}
header('Content-Type: application/json');
echo json_encode($bool);
