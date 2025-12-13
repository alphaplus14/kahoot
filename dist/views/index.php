<?php
if (!empty($_GET['error']) && isset($_GET['error'])) {
    $error = $_GET['error'];
    $message = $_GET['message'];
    $title = $_GET['title'];
}
?>


<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lobby Partida</title>
    <link rel="stylesheet" href="../css/lobby.css">
    <link href="../css/styles.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.5.0/css/responsive.dataTables.min.css">
</head>

<body class="bg-primary d-flex flex-column min-vh-100">
    <?php if (!empty($_GET['error']) && isset($_GET['error']) && $error == true) { ?>
        <button class="visually-hidden" id="alertasErrores" onclick="sweetAlertasError('<?php echo $message ?>', '<?php echo $title ?>')"></button>
    <?php } ?>
    <div class="container-fluid">
        <header class="row align-items-center">
            <div class="col-12 d-flex justify-content-end p-3">
                <a href="login.php" class="btn btn-dark">Iniciar Sesión</a>
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
                <div class="col-10 col-sm-6 col-md-4 col-lg-3 bg-white p-4 rounded shadow">
                    <form action="procesar_pin.php" method="post">
                        <div class="mb-2">
                            <input class="form-control text-center p-3" id="pinIngresado" type="text" pattern="\d{6}" maxlength="6" placeholder="PIN de partida" name="pinIngresado" required />
                        </div>
                        <div class="d-flex align-items-center justify-content-end mt-3 mb-0">
                            <button type="button" id="ingresar" class="btn btn-dark btnIngresar w-100 p-2 fs-5">Ingresar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>

    <footer id="nopin" class="position-fixed bottom-0 w-100">
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../js/login/login.js"></script>
    <script src="../js/lobby/lobby.js"></script>

</body>

</html>