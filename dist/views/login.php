<?php
if (!empty($_GET['error']) && isset($_GET['error'])) {
    $error = $_GET['error'];
    $message = $_GET['message'];
    $title = $_GET['title'];
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Login - ¿Y esa Pregunta?</title>
    <link href="../css/login.css" rel="stylesheet" />
    <link href="../css/styles.css" rel="stylesheet" />
</head>

<body class="bg-primary">
    <?php if (!empty($_GET['error']) && isset($_GET['error']) && $error == true) { ?>
        <button class="visually-hidden" id="alertasErrores" onclick="sweetAlertasError('<?php echo $message ?>', '<?php echo $title ?>')"></button>
    <?php } ?>
    <main>
        <div class="container-fluid vh-100">
            <div class="row h-100 d-flex justify-content-center align-items-center">
                <div class="col-10 col-sm-6 col-md-4 col-lg-3 bg-white p-4 rounded shadow">
                    <h2 class="text-center mb-4">Inicio de sesión</h2>
                    <form action="../../controller/controllerLogin.php" method="post">
                        <div class="form-floating mb-3">
                            <input class="form-control" id="usuarioLogin" type="text" placeholder="Usuario" name="usuarioLogin" />
                            <label for="usuarioLogin">Usuario</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input class="form-control" id="passLogin" type="password" placeholder="Contraseña" name="passLogin" />
                            <label for="passLogin">Contraseña</label>
                        </div>
                        <div class="d-flex align-items-center justify-content-end mt-4 mb-0">
                            <button type="submit" class="btn btn-dark w-100">Ingresar</button>
                        </div>
                        <div class="d-flex align-items-center justify-content-end mt-1 mb-0">
                            <a href="../../index.php" class="btn btn-danger w-100">Cancelar</a>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script src="../js/scripts.js"></script>
    <script src="../js/login/login.js"></script>
</body>

</html>