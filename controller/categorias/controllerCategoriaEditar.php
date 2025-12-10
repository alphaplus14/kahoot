<?php
session_start();
if (!$_SESSION) {
    header('Location: ../../dist/views/login.php?error=true&message=No puedes acceder a esta pagina, inicia sesion con un usuario valido!&title=Acceso denegado');
    exit;
}
header('Content-Type: application/json');
$nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$id = filter_var(($_POST['id']), FILTER_SANITIZE_NUMBER_INT);
require_once '../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
try {
    $sql = "UPDATE categorias SET nombre_categoria = :nombre WHERE id_categoria = :id;";
    $stmt = $mysql->getConexion()->prepare($sql);
    $stmt->bindParam(":nombre", $nombre, PDO::PARAM_STR);
    $stmt->bindParam(":id", $id, PDO::PARAM_STR);
    $stmt->execute();
    //? Retorno de datos aplicando JSON
    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'message' => 'Categoria actualizada exitosamente!']);
} catch (\Throwable $th) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Error al editar Categoria!', 'error' => $th]);
};
