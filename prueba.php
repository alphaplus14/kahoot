<?php
require_once 'models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();







try {
    $resultadoIdPartida = $mysql->efectuarConsulta("SELECT * FROM partidas WHERE pin_partida = 177154;");
    $datosPartida = [];
    while ($row = mysqli_fetch_assoc($resultadoIdPartida)) {
        $datosPartida[] = $row;
    }
    $idPartida = $datosPartida[0]['id_partida'];
    echo $datosPartida[0]['id_partida'];
} catch (\Throwable $th) {
    //throw $th;
}


