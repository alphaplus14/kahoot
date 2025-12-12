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
</head>

<body>
    <div class="container-fluid" style="height: 500px;">
        <div class="row justify-content-center mt-5 h-100">
            <div class="col-md-8 bg bg-info border rounded-3 text-white px-4 pt-4">
                <div class="row">
                    <div class="col-md-8 text-start">
                        <label for="" id="contador" class="mb-4 badge bg-dark rounded-2">Tiempo Restante: 0</label>
                    </div>
                    <div class="col-md-4 text-end">
                        <label for="" id="puntos" class="mb-4 badge bg-dark rounded-2">Puntos 0</label>
                    </div>
                </div>
                <div class="col-mb-4 text-center bg bg-dark p-3 border border-dark rounded-3 align-items-center justify-content-center d-flex" style="height: 200px;">
                    <h1 id="pregunta"></h1>
                </div>
                <form class="p-2 formPreguntas align-items-end mt-5">
                    <div class="row text-center">
                        <div class="col-md p-0">
                            <div class="mb-3">
                                <button type="button" class="btn btn-dark respuestaA w-75"></button>
                            </div>
                        </div>
                        <div class="col-md p-0">
                            <div class="mb-3">
                                <button type="button" class="btn btn-dark respuestaB w-75"></button>
                            </div>
                        </div>
                    </div>
                    <div class="row text-center">
                        <div class="col-md p-0">
                            <div class="mb-3">
                                <button type="button" class="btn btn-dark respuestaC w-75"></button>
                            </div>
                        </div>
                        <div class="col-md p-0">
                            <div class="mb-3">
                                <button type="button" class="btn btn-dark respuestaD w-75"></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>
    <script src="../js/juego/juego.js"></script>
</body>

</html>