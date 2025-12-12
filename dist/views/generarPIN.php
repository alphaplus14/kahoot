<?php
session_start();
if (!$_SESSION || $_SESSION['estado_usuario'] != 'Activo') {
    header('Location: login.php?error=true&message=No puedes acceder a esta pagina, inicia sesion con un usuario valido!&title=Acceso denegado');
    exit;
}
if (!empty($_GET['error']) && isset($_GET['error'])) {
    $error = $_GET['error'];
    $message = $_GET['message'];
    $title = $_GET['title'];
}
require_once '../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();

//? Datos categorias
$stmt = $mysql->getConexion()->query("SELECT categorias.nombre_categoria, categorias.id_categoria , COUNT(cuestionario.categorias_id_categoria) as conteo FROM cuestionario 
JOIN categorias ON categorias.id_categoria = cuestionario.categorias_id_categoria
WHERE categorias.estado_categoria = 'Activo' AND cuestionario.estado_cuestionario = 'Activo' GROUP BY categorias.nombre_categoria;");

$categorias = [];


while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $row['id_categoria'] = (int)$row['id_categoria'];
    $categorias[] = $row;
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
    <title>Generar PIN - ¿Y esa Pregunta?</title>
    <link href="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/style.min.css" rel="stylesheet" />
    <link href="../css/styles.css" rel="stylesheet" />
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.5.0/css/responsive.dataTables.min.css">
</head>

<body class="sb-nav-fixed">
    <?php if (!empty($_GET['error']) && isset($_GET['error']) && $error == true) { ?>
        <button class="visually-hidden" id="alertasErrores" onclick="sweetAlertasError('<?php echo $message ?>', '<?php echo $title ?>')"></button>
    <?php } ?>
    <!-- Barra de navegación superior -->
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <!-- Navbar Brand -->
        <a class="navbar-brand ps-3" href="./dashboard.php">
            <?php echo $_SESSION['nombre_usuario']; ?>
        </a>
        <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle">
            <i class="fas fa-bars"></i>
        </button>
        <!-- Sidebar Toggle -->

        <!-- Buscador superior -->
        <div class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        </div>
        <!-- Dropdown usuario -->
        <ul class="navbar-nav ms-100 ms-md-0 me-3 me-lg-4">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fas fa-user fa-fw"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><button class="dropdown-item text-success d-flex justify-content-center align-items-center" id="configuracionPerfil" name="<?php echo $_SESSION['id_usuario'] ?>"><i class="bi bi-person-gear fs-3"></i> Configuracion de perfil</button></li>
                    <li>
                        <hr class="dropdown-divider" />
                    </li>
                    <li>
                        <a href="../../controller/controllerLogout.php"
                            class="dropdown-item text-danger d-flex justify-content-center align-items-center position-relative ps-4">

                            <i class="bi bi-box-arrow-in-right fs-3"
                                style="position: absolute; left: 15px;"></i>
                            Cerrar Sesión
                        </a>
                    </li>

                </ul>
            </li>
        </ul>
    </nav>
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <div class="sb-sidenav-menu-heading">Administracion</div>
                        <a class="nav-link" href="dashboard.php">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            Panel de Administracion
                        </a>
                        <div class="sb-sidenav-menu-heading">Juegos</div>
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseJuegos"
                            aria-expanded="true" aria-controls="collapseJuegos">
                            <div class="sb-nav-link-icon"><i class="bi bi-patch-plus"></i></div>
                            Configurar Juego
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse" id="collapseJuegos" data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="categorias.php">Categorias</a>
                                <a class="nav-link" href="bancoPreguntas.php">Banco de Preguntas</a>
                            </nav>
                        </div>
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePartidas"
                            aria-expanded="true" aria-controls="collapsePartidas">
                            <div class="sb-nav-link-icon"><i class="bi bi-controller"></i></div>
                            Partidas
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse show" id="collapsePartidas" data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link active" href="generarPIN.php">Generar PIN</a>
                                <a class="nav-link" href="historialPartidas.php">Historial de partidas</a>
                            </nav>
                        </div>
                    </div>
                </div>
                <div class="sb-sidenav-footer">
                    <div class="small">Logueado como:</div>
                    <?php echo "<p class='text-uppercase fw-bold mb-0'> " . $_SESSION['nombre_usuario'] . "</p>"; ?>
                </div>
            </nav>
        </div>
        <!-- Contenido principal -->
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">Partidas</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">Generar PIN</li>
                    </ol>
                    <div class="row">
                        <div class="col">
                            <form id="generarPinForm">
                                <div class="mb-3">
                                    <label for="categoria" class="form-label">Selecciona una categoria para el juego</label>
                                    <select class="form-select categoriasInput" aria-label="Default select example" id="categoria" name="categoria">
                                        <option selected>Seleccione una categoria</option>
                                        <?php //? CATEGORIAS
                                        foreach ($categorias as $rowCategoria): ?>
                                            <option value="<?php echo $rowCategoria['id_categoria']; ?>" name="<?php echo $rowCategoria['conteo']; ?>"><?php echo $rowCategoria['nombre_categoria'] . " / Preguntas disponibles: " . $rowCategoria['conteo']; ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="limitePreguntas" class="form-label">Limite de Preguntas</label>
                                    <input type="number" class="form-control limitePreguntasInput" id="limitePreguntas" name="limitePreguntas" min="0">
                                </div>
                                <button type="button" class="btn btn-success" id="buttonEnviarForm">Generar PIN</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
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
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script src="../js/generarPIN/generarPIN.js"></script>
    <script src="../js/scripts.js"></script>
    <script src="../js/general/scriptsGenerales.js" type="module"></script>
</body>

</html>