<?php
session_start();
if (!$_SESSION) {
    header('Location: ../../dist/views/login.php?error=true&message=No puedes acceder a esta pagina, inicia sesion con un usuario valido!&title=Acceso denegado');
    exit;
}
require_once '../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
$id = $_POST['id'];
try {
    $sql = "UPDATE usuarios SET estado_usuario = 'Activo' WHERE id_usuario = :idUsuario;";
    $stmt = $mysql->getConexion()->prepare($sql);
    $stmt->bindParam(":idUsuario", $id, PDO::PARAM_INT);
    $stmt->execute();
    //? Retorno de datos aplicando JSON
    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'message' => 'Usuario activado exitosamente!']);
} catch (\Throwable $th) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Error al activar el usuario!', 'error' => $th]);
};
