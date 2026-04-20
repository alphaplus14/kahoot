<?php
require_once __DIR__ . '/../../includes/auth.php';
header('Content-Type: application/json');
requireActiveUserJson();
csrf_validate();

$id                 = filter_input(INPUT_POST, 'id',        FILTER_VALIDATE_INT);
$categoria          = filter_input(INPUT_POST, 'categoria', FILTER_VALIDATE_INT);
$pregunta           = isset($_POST['pregunta'])          ? trim(filter_var($_POST['pregunta'],          FILTER_SANITIZE_FULL_SPECIAL_CHARS)) : '';
$respuestaA         = isset($_POST['respuestaA'])        ? trim(filter_var($_POST['respuestaA'],        FILTER_SANITIZE_FULL_SPECIAL_CHARS)) : '';
$respuestaB         = isset($_POST['respuestaB'])        ? trim(filter_var($_POST['respuestaB'],        FILTER_SANITIZE_FULL_SPECIAL_CHARS)) : '';
$respuestaC         = isset($_POST['respuestaC'])        ? trim(filter_var($_POST['respuestaC'],        FILTER_SANITIZE_FULL_SPECIAL_CHARS)) : '';
$respuestaD         = isset($_POST['respuestaD'])        ? trim(filter_var($_POST['respuestaD'],        FILTER_SANITIZE_FULL_SPECIAL_CHARS)) : '';
$respuestaCorrecta  = isset($_POST['respuestaCorrecta']) ? trim(filter_var($_POST['respuestaCorrecta'], FILTER_SANITIZE_FULL_SPECIAL_CHARS)) : '';

if (!$id || !$categoria || $pregunta === '' || $respuestaA === '' || $respuestaB === '' || $respuestaC === '' || $respuestaD === '' || $respuestaCorrecta === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Faltan datos']);
    exit;
}

require_once __DIR__ . '/../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
try {
    $sql = 'UPDATE cuestionario SET
                pregunta                = :pregunta,
                respuesta_A             = :respuestaA,
                respuesta_B             = :respuestaB,
                respuesta_C             = :respuestaC,
                respuesta_D             = :respuestaD,
                respuesta_correcta      = :respuestaCorrecta,
                categorias_id_categoria = :categoria
            WHERE id_cuestionario = :id';
    $stmt = $mysql->getConexion()->prepare($sql);
    $stmt->bindParam(':id',                $id,                PDO::PARAM_INT);
    $stmt->bindParam(':pregunta',          $pregunta,          PDO::PARAM_STR);
    $stmt->bindParam(':respuestaA',        $respuestaA,        PDO::PARAM_STR);
    $stmt->bindParam(':respuestaB',        $respuestaB,        PDO::PARAM_STR);
    $stmt->bindParam(':respuestaC',        $respuestaC,        PDO::PARAM_STR);
    $stmt->bindParam(':respuestaD',        $respuestaD,        PDO::PARAM_STR);
    $stmt->bindParam(':respuestaCorrecta', $respuestaCorrecta, PDO::PARAM_STR);
    $stmt->bindParam(':categoria',         $categoria,         PDO::PARAM_INT);
    $stmt->execute();
    echo json_encode(['success' => true, 'message' => 'Cuestionario editado exitosamente!']);
} catch (Throwable $th) {
    error_log('Editar cuestionario: ' . $th->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al editar Cuestionario']);
} finally {
    $mysql->desconectar();
}
