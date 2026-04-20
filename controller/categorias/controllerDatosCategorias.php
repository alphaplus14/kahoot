<?php
require_once __DIR__ . '/../../includes/auth.php';
header('Content-Type: application/json');
requireActiveUserJson();

require_once __DIR__ . '/../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
try {
    $stmt = $mysql->getConexion()->prepare("SELECT * FROM categorias WHERE estado_categoria = 'Activo'");
    $stmt->execute();
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (Throwable $th) {
    error_log('Datos categorias: ' . $th->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al traer categorías']);
} finally {
    $mysql->desconectar();
}
