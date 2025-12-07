<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lobby Partida</title>
    <link rel="stylesheet" href="../css/lobby.css">
    <link rel="stylesheet" href="../css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.5.0/css/responsive.dataTables.min.css">
</head>

<body class="bg-primary d-flex flex-column min-vh-100">
    <div class="container-fluid">
        <header class="row align-items-center">
            <div class="col-6 d-flex justify-content-center align-items-center">
                
            </div>
        </header>
    </div>
    <main class="flex-grow-1 d-flex justify-content-center align-items-center">
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-6 col-sm-4 col-md-3 col-lg-2 d-flex justify-content-center align-items-center mb-4">
                    <img class="logo img-fluid p-2" src="../assets/img/logo.png" alt="logo" srcset="¿Y esa Pregunta?">
                </div>
            </div>
            <div class="container-body row justify-content-center">
                <div class="col-10 col-sm-6 col-md-4 col-lg-3 bg-white p-4 rounded shadow">
                    <form action="" method="post">
                        <div class="mb-2">
                            <input class="form-control text-center p-3" id="pin" type="text" placeholder="PIN de partida" name="usuarioLogin" />
                        </div>
                        <div class="d-flex align-items-center justify-content-end mt-3 mb-0">
                            <button type="button" id="ingresar" class="btn btn-dark form-control p-2 fs-5">Ingresar</button>
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