<?php
session_start();
if (!$_SESSION) {
    header('Location: ../../dist/login.php?error=true&message=No puedes acceder a esta pagina, inicia sesion con un usuario valido!&title=Acceso denegado');
    exit;
}
require_once '../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
$categoriaJuego = filter_var($_POST['categoria'], FILTER_SANITIZE_NUMBER_INT);
$limitePreguntas = filter_var($_POST['limitePreguntas'], FILTER_SANITIZE_NUMBER_INT);
$pinPartida = filter_var($_POST['pin'], FILTER_SANITIZE_NUMBER_INT);

//? Traer id de la partida
try {
    $sql = "SELECT * FROM partidas WHERE pin_partida = :pin_partida";
    $stmt = $mysql->getConexion()->prepare($sql);
    $stmt->bindParam(':pin_partida', $pinPartida, PDO::PARAM_INT);
    $stmt->execute();

    $datosPartida = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $datosPartida[] = $row;
    }
    $idPartida = $datosPartida[0]['id_partida'];
} catch (\Throwable $th) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Error ' . $th]);
}

//? Traer preguntas
try {
    if ($categoriaJuego == 0) {
        $sql = "SELECT * FROM cuestionario;";
        $stmt = $mysql->getConexion()->prepare($sql);
    } else {
        $sql = "SELECT * FROM cuestionario WHERE categorias_id_categoria = :categoria";
        $stmt = $mysql->getConexion()->prepare($sql);
        $stmt->bindParam(':categoria', $categoriaJuego, PDO::PARAM_INT);
    }
    $stmt->execute();

    $preguntas = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $preguntas[] = $row;
    }
} catch (\Throwable $th) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Error ' . $th]);
}

//? Insertar Preguntas en Pivote
try {
    //? Ciclo para insertar preguntas
    for ($i = 0; $i < $limitePreguntas;) {
        //? Generar randomizado de preguntas
        $numero = random_int(0, count($preguntas) - 1);
        //? Verificacion para evitar preguntas repetidas
        if ($preguntas[$numero]['id_cuestionario'] != "") {
            $pregunta = $preguntas[$numero]['id_cuestionario'];
            $preguntas[$numero]['id_cuestionario'] = "";
            //? Insertar valores
            $sql = "INSERT INTO quiz (cuestionario_id_cuestionario, partidas_id_partida) VALUES (:pregunta, :partida)";
            $stmt = $mysql->getConexion()->prepare($sql);
            $stmt->bindParam(':pregunta', $pregunta, PDO::PARAM_INT);
            $stmt->bindParam(':partida', $idPartida, PDO::PARAM_INT);
            $stmt->execute();
            $i++;
        }
    }
    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'message' => 'Juego creado exitosamente!']);
} catch (\Throwable $th) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Error ' . $th]);
}
