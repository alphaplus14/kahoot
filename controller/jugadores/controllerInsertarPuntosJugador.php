<?php
if (
    isset($_POST['puntos']) &&
    !empty($_POST['puntos'])
) {
    session_start();
    $nombre = $_SESSION['nombreJugador'];
    $ficha = $_SESSION['fichaJugador'];
    $idPartida = $_SESSION['idPartida'];
    $puntos = filter_var($_POST['puntos'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    require_once '../../models/MySQL.php';
    $mysql = new MySQL();
    $mysql->conectar();
    try {
        $sql = "UPDATE jugadores SET puntaje_jugador = :puntos
        WHERE nombre_jugador = :nombre AND ficha_jugador = :ficha AND partidas_id_partida = :idPartida;";
        $stmt = $mysql->getConexion()->prepare($sql);
        $stmt->bindParam(":nombre", $nombre, PDO::PARAM_STR);
        $stmt->bindParam(":ficha", $ficha,  PDO::PARAM_STR);
        $stmt->bindParam(":idPartida", $idPartida, PDO::PARAM_INT);
        $stmt->bindParam(":puntos", $puntos, PDO::PARAM_INT);
        $stmt->execute();
        //* Se eliminan todas las variables de la sesión
        session_unset();

        //* Se destruye completamente la sesión actual
        session_destroy();
        //? Retorno de datos aplicando JSON
        header("Content-Type: application/json");
        echo json_encode(['success' => true, 'message' => 'Datos guardados exitosamente, muchas gracias por jugar!']);
    } catch (\Throwable $th) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Error al registrar jugador!', 'error' => $th]);
    };
} else {
    header("Content-Type: application/json");
    echo json_encode(['success' => false, 'message' => 'Faltan Datos']);
}
