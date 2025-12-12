<?php
session_start();
if (!$_SESSION) {
    header('Location: ../../dist/views/login.php?error=true&message=No puedes acceder a esta pagina, inicia sesion con un usuario valido!&title=Acceso denegado');
    exit;
}
if (
    isset($_POST['id']) &&
    !empty($_POST['id']) &&
    isset($_POST['pregunta']) &&
    !empty($_POST['pregunta']) &&
    isset($_POST['respuestaA']) &&
    !empty($_POST['respuestaA']) &&
    isset($_POST['respuestaB']) &&
    !empty($_POST['respuestaB']) &&
    isset($_POST['respuestaC']) &&
    !empty($_POST['respuestaC']) &&
    isset($_POST['respuestaD']) &&
    !empty($_POST['respuestaD']) &&
    isset($_POST['respuestaCorrecta']) &&
    !empty($_POST['respuestaCorrecta']) &&
    isset($_POST['categoria']) &&
    !empty($_POST['categoria'])
) {
    $id = filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT);
    $pregunta = filter_var($_POST['pregunta'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $respuestaA = filter_var($_POST['respuestaA'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $respuestaB = filter_var($_POST['respuestaB'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $respuestaC = filter_var($_POST['respuestaC'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $respuestaD = filter_var($_POST['respuestaD'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $respuestaCorrecta = filter_var($_POST['respuestaCorrecta'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $categoria = filter_var($_POST['categoria'], FILTER_SANITIZE_NUMBER_INT);
    require_once '../../models/MySQL.php';
    $mysql = new MySQL();
    $mysql->conectar();
    try {
        $sql = "UPDATE cuestionario SET 
        pregunta = :pregunta, 
        respuesta_A = :respuestaA, 
        respuesta_B = :respuestaB, 
        respuesta_C = :respuestaC, 
        respuesta_D = :respuestaD, 
        respuesta_correcta = :respuestaCorrecta,
        categorias_id_categoria = :categoria
        WHERE id_cuestionario = :id";
        $stmt = $mysql->getConexion()->prepare($sql);
        $stmt->bindParam(":id", $id, PDO::PARAM_INT);
        $stmt->bindParam(":pregunta", $pregunta, PDO::PARAM_STR);
        $stmt->bindParam(":respuestaA", $respuestaA, PDO::PARAM_STR);
        $stmt->bindParam(":respuestaB", $respuestaB, PDO::PARAM_STR);
        $stmt->bindParam(":respuestaC", $respuestaC, PDO::PARAM_STR);
        $stmt->bindParam(":respuestaD", $respuestaD, PDO::PARAM_STR);
        $stmt->bindParam(":respuestaCorrecta", $respuestaCorrecta, PDO::PARAM_STR);
        $stmt->bindParam(":categoria", $categoria, PDO::PARAM_INT);
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
