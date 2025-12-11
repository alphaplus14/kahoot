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

    <main class="flex-grow-1 d-flex justify-content-center align-items-center">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-6 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center align-items-center mb-4">
                    <img class="logo img-fluid p-2" src="../assets/img/logo.png" alt="¿Y esa Pregunta?">
                </div>
            </div>
            <div class="container-body row justify-content-center">
                <div class="col-10 col-sm-6 col-md-4 col-lg-3 card-lobby">
                    <form action="" method="post">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="nombre" placeholder="Nombre" required>
                            <label for="nombre">Nombre</label>
                        </div>

                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="ficha" placeholder="Ficha" required>
                            <label for="ficha">Ficha</label>
                        </div>
                        <div class="d-flex align-items-center justify-content-end mt-4 mb-0">
                            <button type="submit" class="btn btn-dark w-100">Entrar al juego</button>
                        </div>
                        <div class="d-flex align-items-center justify-content-end mt-2 mb-0">
                            <a href="index.php" class="btn btn-danger w-100">Cancelar</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>

    <footer id="nopin" class="position-fixed bottom-0 w-100">
    </footer>

    <script src="../js/lobby/lobby.js" type="module"></script>
</body>

</html>