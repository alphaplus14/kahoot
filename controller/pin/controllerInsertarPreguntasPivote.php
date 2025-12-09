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
    $resultadoIdPartida = $mysql->efectuarConsulta("SELECT * FROM partidas WHERE pin_partida = $pinPartida;");
    $datosPartida = [];
    while ($row = mysqli_fetch_assoc($resultadoIdPartida)) {
        $datosPartida[] = $row;
    }
    $idPartida = $datosPartida[0]['id_partida'];
} catch (\Throwable $th) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Error ' . $th]);
}

//? Traer preguntas por categoria
try {
    $resultadoPreguntasDisponibles = $mysql->efectuarConsulta("SELECT * FROM cuestionario WHERE categorias_id_categoria = $categoriaJuego;");
    $preguntas = [];
    while ($row = mysqli_fetch_assoc($resultadoPreguntasDisponibles)) {
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
            $mysql->efectuarConsulta("INSERT INTO quiz 
            (cuestionario_id_cuestionario, partidas_id_partida) 
            VALUES ($pregunta,$idPartida);");
            $i++;
        }
    }
    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'message' => 'Juego creado exitosamente!']);
} catch (\Throwable $th) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Error ' . $th]);
}
