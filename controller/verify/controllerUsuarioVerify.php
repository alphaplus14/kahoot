<?php
require_once '../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
$nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$ficha = filter_var($_POST['ficha'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$idPartida = filter_var($_POST['idPartida'], FILTER_SANITIZE_NUMBER_INT);
try {
    $sql = "SELECT * FROM jugadores WHERE nombre_jugador = :nombre AND ficha_jugador = :ficha AND partidas_id_partida = :idPartida;";
    $stmt = $mysql->getConexion()->prepare($sql);
    $stmt->bindParam(":nombre", $nombre, PDO::PARAM_STR);
    $stmt->bindParam(":ficha", $ficha, PDO::PARAM_STR);
    $stmt->bindParam(":idPartida", $idPartida, PDO::PARAM_INT);
    $stmt->execute();
} catch (\Throwable $th) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Error al verificar email', 'error' => $th]);
};

$resultado = $stmt->fetch(PDO::FETCH_ASSOC);
$bool = true;
if ($resultado != false) {
    $bool = false;
}
header("Content-Type: application/json");
echo json_encode($bool);
