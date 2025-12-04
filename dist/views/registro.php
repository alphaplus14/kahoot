<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Login - Biblioteca ADSO</title>
    <link href="css/styles.css" rel="stylesheet" />
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
</head>

<body class="bg-primary">
    <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
            <main>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-5">
                            <div class="card shadow-lg border-0 rounded-lg mt-5">
                                <div class="card-header">
                                    <h3 class="text-center font-weight-light my-4">Registro de cuenta</h3>
                                </div>
                                <div class="card-body">
                                    <form action="../controller/controllerSigUp.php" method="post">
                                        <div class="form-floating mb-3">
                                            <input class="form-control" id="usuarioNombre" type="text" placeholder="Nombre" name="usuarioNombre" />
                                            <label for="usuarioNombre">Nombre</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input class="form-control" id="usuarioApellido" type="text" placeholder="Usuario" name="usuarioApellido" />
                                            <label for="usuarioApellido">Apellido</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input class="form-control" id="usuarioEmail" type="email" placeholder="Email" name="usuarioEmail" />
                                            <label for="usuarioEmail">Email</label>
                                        </div>
                                        <div class="form-floating mb-3">
                                            <input class="form-control" id="usuarioPass" type="password" placeholder="Contraseña" name="usuarioPass" />
                                            <label for="usuarioPass">Contraseña</label>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-end mt-4 mb-0">
                                            <button type="submit" class="btn btn-primary form-control">Enviar</button>
                                        </div>
                                    </form>
                                </div>
                                <div class="card-footer text-center py-3">
                                    <div class="small"><a href="login.php">¿Ya tienes cuenta? Inicia sesion aqui</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        <div id="layoutAuthentication_footer">
            <footer class="py-4 bg-light mt-auto">
                <div class="container-fluid px-4">
                    <div class="d-flex align-items-center justify-content-between small">
                        <div class="text-muted">Copyright &copy; ADSO 3064749 / 2025</div>
                        <div>
                            <button class="btn btn-link" id="politicaPrivacidad">Política &amp; Privacidad</button>
                            &middot;
                            <button class="btn btn-link" id="terminosCondiciones">Términos &amp; Condiciones</button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script src="js/scripts.js"></script>
</body>

</html>