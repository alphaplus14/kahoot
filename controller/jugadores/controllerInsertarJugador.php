<?php
if (
    isset($_POST['nombreJugador']) &&
    !empty($_POST['nombreJugador']) &&
    isset($_POST['fichaJugador']) &&
    !empty($_POST['fichaJugador']) &&
    isset($_POST['pinPartida']) &&
    !empty($_POST['pinPartida'])
) {
    $nombre = filter_var($_POST['nombreJugador'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $ficha = filter_var($_POST['fichaJugador'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $pinPartida = filter_var($_POST['pinPartida'], FILTER_SANITIZE_NUMBER_INT);
    require_once '../../models/MySQL.php';
    $mysql = new MySQL();
    $mysql->conectar();
    try {
        $sql = "INSERT INTO jugadores (nombre_jugador, ficha_jugador, partidas_id_partida) VALUES (:nombre, :ficha, :idPartida);";
        $stmt = $mysql->getConexion()->prepare($sql);
        $stmt->bindParam(":nombre", $nombre, PDO::PARAM_STR);
        $stmt->bindParam(":ficha", $ficha, PDO::PARAM_STR);
        $stmt->bindParam(":idPartida", $pinPartida, PDO::PARAM_INT);
        $stmt->execute();
        //? Retorno de datos aplicando JSON
        header("Content-Type: application/json");
        echo json_encode(['success' => true, 'message' => 'Jugador registrado exitosamente!']);
    } catch (\Throwable $th) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Error al registrar jugador!', 'error' => $th]);
    };
} else {
    header("Content-Type: application/json");
    echo json_encode(['success' => false, 'message' => 'Faltan Datos']);
}
