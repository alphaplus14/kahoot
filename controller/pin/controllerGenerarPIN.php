<?php
session_start();
if (!$_SESSION) {
    header('Location: ../../dist/login.php?error=true&message=No puedes acceder a esta pagina, inicia sesion con un usuario valido!&title=Acceso denegado');
    exit;
}
require_once '../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
$segundos = filter_var($_POST['segundos'], FILTER_SANITIZE_NUMBER_INT);
$limitePreguntas = filter_var($_POST['limitePreguntas'], FILTER_SANITIZE_NUMBER_INT);
$fecha = date("Y-m-d H:i:s");
$verf = false;
while ($verf == false) {
    $pinPartida = random_int(100000, 999999);
    $sql = "SELECT * FROM partidas WHERE pin_partida = :pin_partida";
    $stmt = $mysql->getConexion()->prepare($sql);
    $stmt->bindParam(':pin_partida', $pinPartida, PDO::PARAM_INT);
    $stmt->execute();

    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($resultado == false) {
        $verf = true;
    }
}
//? Insertar PIN de partida 
try {
    $sql = "INSERT INTO partidas 
            (pin_partida, preguntas_limite_partida, estado_partida, fecha_partida, segundos_pregunta_partida) 
            VALUES (:pin_partida, :limite_preguntas, :estado, :fecha, :segundos)";

    $stmt = $mysql->getConexion()->prepare($sql);
    $stmt->bindParam(':pin_partida', $pinPartida, PDO::PARAM_INT);
    $stmt->bindParam(':limite_preguntas', $limitePreguntas, PDO::PARAM_INT);
    $estado = 'Esperando';
    $stmt->bindParam(':estado', $estado, PDO::PARAM_STR);
    $stmt->bindParam(':fecha', $fecha, PDO::PARAM_STR);
    $stmt->bindParam(':segundos', $segundos, PDO::PARAM_INT);
    $stmt->execute();
    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'pin' => $pinPartida]);
    exit();
} catch (\Throwable $th) {
    $mysql->desconectar();
    header("Location: ../dist/views/generarPIN.php?error=true&message=" . $th . "&title=Error al generar PIN!");
    exit();
}
