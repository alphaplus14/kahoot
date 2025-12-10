<?php
require_once 'models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();


$idUsuario = 1;
try {
    $sql = "SELECT * FROM usuarios WHERE id_usuario = :idUsuario;";
    $stmt = $mysql->getConexion()->prepare($sql);
    $stmt->bindParam(':idUsuario', $idUsuario, PDO::PARAM_INT);
    $stmt->execute();
} catch (\Throwable $th) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Error al traer datos de usuario por ID', 'error' => $th]);
}
$datos = $stmt->fetch(PDO::FETCH_ASSOC);
header('Content-Type: application/json');
echo json_encode($datos);


