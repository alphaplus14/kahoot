<?php
session_start();
require_once '../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
$idPartida = $_SESSION['idPartida'];
$stmt = $mysql->getConexion()->query("SELECT * FROM partidas WHERE id_partida = $idPartida AND estado_partida = 'Esperando' OR estado_partida = 'Jugando';");
$verificacion = $stmt->fetch(PDO::FETCH_ASSOC);
if ($verificacion == false) {
    header("Location: idndex.php");
    $mysql->desconectar();
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Juego - ¿Y esa pregunta?</title>
    <link rel="stylesheet" href="../css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="../css/juego.css">
</head>

<body>
    <div class="container-fluid vh-100 d-flex flex-column">
        <div class="row mt-2 align-items-center text-white">
            <div class="col-md text-start">
                <img src="../assets/media/1.png" alt="Logo Sena" class="img-fluid">
            </div>
            <div class="col-md text-end">
                <label for="" id="contador" class="mb-2 mt-0 badge bg-success rounded-2 fs-4">Tiempo Restante: 0</label>
                <label for="" id="puntos" class="mb-2 mt-0 badge bg-success rounded-2 fs-4">Puntos 0</label>
            </div>
        </div>
        <div class="row text-white mt-4">
            <div class="col-mb-4 text-center bg bg-dark p-3 border border-dark align-items-center justify-content-center d-flex" style="height: 200px;">
                <h1 id="pregunta"></h1>
            </div>
        </div>
        <form class="formPreguntas">
            <div class="container-juego row p-5">
                <div class="col-md-6">
                    <div class="mb-3">
                        <button type="button" class="btn btn-danger respuestaA w-100 fs-2 rounded-4 shadow"></button>
                    </div>
                    <div class="mb-3">
                        <button type="button" class="btn btn-warning respuestaC w-100 fs-2 rounded-4 shadow"></button>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <button type="button" class="btn btn-primary respuestaB w-100 fs-2 rounded-4 shadow"></button>
                    </div>
                    <div class="mb-3">
                        <button type="button" class="btn btn-success respuestaD w-100 fs-2 rounded-4 shadow"></button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <script src="../js/juego/juego.js"></script>
</body>

</html>