<?php
session_start();
require_once '../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
$idPartida = $_SESSION['idPartida'];
$stmt = $mysql->getConexion()->query("SELECT 
partidas.segundos_pregunta_partida,
c.pregunta,
c.respuesta_A, 
c.respuesta_B, 
c.respuesta_C, 
c.respuesta_D, 
c.respuesta_correcta
FROM partidas
JOIN quiz ON quiz.partidas_id_partida = partidas.id_partida
JOIN cuestionario as c ON c.id_cuestionario = quiz.cuestionario_id_cuestionario
WHERE partidas.id_partida = $idPartida;");

$preguntas = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $row['segundos_pregunta_partida'] = (int)$row['segundos_pregunta_partida'];
    $preguntas[] = $row;
}
echo json_encode($preguntas);
$mysql->desconectar();
