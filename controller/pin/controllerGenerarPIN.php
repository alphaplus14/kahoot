<?php
session_start();
if (!$_SESSION) {
    header('Location: ../../dist/login.php?error=true&message=No puedes acceder a esta pagina, inicia sesion con un usuario valido!&title=Acceso denegado');
    exit;
}
require_once '../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
$categoriaJuego = filter_var($_POST['categoria'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$limitePreguntas = filter_var($_POST['limitePreguntas'], FILTER_VALIDATE_INT);
$fecha = date("Y-m-d H:i:s");
$verf = false;
while ($verf == false) {
    $pinPartida = random_int(100000, 999999);
    $resultado = $mysql->efectuarConsulta("SELECT * FROM partidas WHERE pin_partida = $pinPartida");
    if (mysqli_num_rows($resultado) == 0) {
        $verf = true;
    }
}
//? Insertar PIN de partida 
try {
    $mysql->efectuarConsulta("INSERT INTO partidas 
    (pin_partida, preguntas_limite_partida, estado_partida, fecha_partida) 
    VALUES ('$pinPartida','$limitePreguntas','Esperando','$fecha');");
} catch (\Throwable $th) {
    $mysql->desconectar();
    header("Location: ../dist/views/generarPIN.php?error=true&message=" . $th . "&title=Error al generar PIN!");
    exit();
}
