<?php
session_start();
if (!$_SESSION) {
    header('Location: ../../dist/views/login.php?error=true&message=No puedes acceder a esta pagina, inicia sesion con un usuario valido!&title=Acceso denegado');
    exit;
}
if (
    isset($_POST['nombre']) &&
    !empty($_POST['nombre'])
) {
    $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    require_once '../../models/MySQL.php';
    $mysql = new MySQL();
    $mysql->conectar();
    try {
        $sql = "INSERT INTO categorias (nombre_categoria, estado_categoria) VALUES (:nombre, 'Activo');";
        $stmt = $mysql->getConexion()->prepare($sql);
        $stmt->bindParam(":nombre", $nombre, PDO::PARAM_STR);
        $stmt->execute();
        //? Retorno de datos aplicando JSON
        header("Content-Type: application/json");
        echo json_encode(['success' => true, 'message' => 'Categoria creada exitosamente!']);
    } catch (\Throwable $th) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Error al crear categoria', 'error' => $th]);
    };
} else {
    header("Content-Type: application/json");
    echo json_encode(['success' => false, 'message' => 'Faltan Datos']);
}
