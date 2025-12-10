<?php
session_start();
if (!isset($_SESSION['id_usuario'])) {
    header('Location: login.php?error=true&message=No puedes acceder a esta pagina, inicia sesion con un usuario valido!&title=Acceso denegado');
    exit;
}
if (isset($_SESSION['estado_usuario']) && $_SESSION['estado_usuario'] != 'Activo') {
    header("Location: login.php?error=true&message=Acceso denegado, solo se aceptan usuarios activos!&title=Acceso denegado!");
    exit;
}
require_once '../..//models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();

$stmt = $mysql->getConexion()->prepare("select pin_partida from partidas order by id_partida desc limit 1");
$stmt->execute();

// Obtener el resultado
$resultado = $stmt->fetch(PDO::FETCH_ASSOC);

?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lobby Partida</title>
    <link rel="stylesheet" href="../css/pin.css">
    <link href="../css/styles.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.5.0/css/responsive.dataTables.min.css">
</head>

<body class="bg-primary d-flex flex-column min-vh-100">
    <div class="container-fluid">
        <header class="row align-items-center">
            <div class="col-12 d-flex justify-content-start p-3">
                <a href="generarPin.php" class="btn btn-dark">Volver</a>
            </div>
        </header>
    </div>

    <main class="flex-grow-1 d-flex justify-content-center align-items-center">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-6 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center align-items-center mb-4">
                    <img class="logo img-fluid p-2" src="../assets/img/logo.png" alt="¿Y esa Pregunta?">
                </div>
            </div>
            <div class="container-body row justify-content-center">
                <div class="col-10 col-sm-6 col-md-4 col-lg-3 p-3 rounded">
                    <div class="mb-2">
                        <label> Game PIN:</label>
                        <h1 class="text-center"><?php echo $resultado['pin_partida']; ?></h1>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <footer id="nopin" class="position-fixed bottom-0 w-100">
    </footer>

</body>

</html>