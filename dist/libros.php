<?php
session_start();
if (!$_SESSION) {
    header('Location: login.php');
    exit;
}
if (!empty($_GET['error']) && isset($_GET['error'])) {
    $error = $_GET['error'];
    $message = $_GET['message'];
    $title = $_GET['title'];
}
require_once '../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();

$resultado = $mysql->efectuarConsulta("SELECT * FROM libro_has_categorias as pivote
JOIN categorias ON categorias.idCategoria = pivote.fkCategoriaPivote
JOIN libro ON libro.idLibro = pivote.fkLibroPivote
GROUP BY libro.idLibro ORDER BY libro.idLibro ASC;");
$libros = [];
while ($fila = mysqli_fetch_assoc($resultado)) {
    $libros[] = $fila;
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title>Gestión de Libros - Biblioteca ADSO</title>
    <link href="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/style.min.css" rel="stylesheet" />
    <link href="css/styles.css" rel="stylesheet" />
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
</head>

<body class="sb-nav-fixed">
    <?php if (!empty($_GET['error']) && isset($_GET['error']) && $error == true) { ?>
        <button class="visually-hidden" id="alertasErrores" onclick="sweetAlertasError('<?php echo $message ?>', '<?php echo $title ?>')"></button>
    <?php } ?>
    <!-- Barra de navegación superior -->
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <!-- Navbar Brand -->
        <a class="navbar-brand ps-3" href="<?php echo ($_SESSION['tipoUsuario'] != "Administrador") ? "libros.php" :  "dashboard.php" ?>">
            <?php echo $_SESSION['nombreUsuario'] . " " . $_SESSION['apellidoUsuario']; ?>
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
                    <li><button class="dropdown-item text-success" id="configuracionPerfil" name="<?php echo $_SESSION['idUsuario'] ?>"><i class="bi bi-person-gear fs-3"></i> Configuracion de perfil</button></li>
                    <li>
                        <hr class="dropdown-divider" />
                    </li>
                    <li><a class="dropdown-item text-danger" href="../controller/controllerLogout.php"><i class="bi bi-box-arrow-in-right fs-3"></i> Cerrar Sesión</a></li>
                </ul>
            </li>
        </ul>
    </nav>

    <!-- Sidebar lateral-->
    <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        <?php
                        if ($_SESSION['tipoUsuario'] === "Administrador") {
                            echo '<div class="sb-sidenav-menu-heading">Administracion</div>
                        <a class="nav-link" href="dashboard.php">
                            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                            Panel de Administracion
                        </a>';
                        };
                        ?>
                        <div class="sb-sidenav-menu-heading">Libros</div>
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePages"
                            aria-expanded="true" aria-controls="collapsePages">
                            <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                            Gestión de Libros
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse show" id="collapsePages" data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link active" href="libros.php">Búsqueda de Libros</a>
                                <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseReservas"
                                    aria-expanded="true" aria-controls="collapseReservas">
                                    Reservas
                                    <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                                </a>

                                <div class="collapse" id="collapseReservas" data-bs-parent="#collapseLibros">
                                    <nav class="sb-sidenav-menu-nested nav">
                                        <a class="nav-link" href="reservasPendientes.php">Reservas Pendientes</a>
                                        <a class="nav-link" href="reservasHistorial.php">Historial de Reservas</a>
                                    </nav>
                                </div>
                                <a class="nav-link" href="prestamos.php">Préstamos</a>
                            </nav>
                        </div>
                    </div>
                </div>
                <div class="sb-sidenav-footer">
                    <div class="small">Logueado como:</div>
                    <?php echo "<p class='text-uppercase fw-bold mb-0'> " . $_SESSION['tipoUsuario'] . "</p>"; ?>
                </div>
            </nav>
        </div>

        <!-- Contenido principal -->
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 class="mt-4">Gestión de Libros</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item">Gestión de Libros</li>
                        <li class="breadcrumb-item fw-bold">Busqueda de libros</li>
                    </ol>

                    <!-- filtros de busqueda sin implementar-->
                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-filter me-1"></i>
                            Filtros de Búsqueda
                        </div>
                        <div class="card-body">
                            <div class="row g-3">
                                <div class="col-md-4">
                                    <label for="busquedaLibro" class="form-label">Buscar</label>
                                    <input type="text" class="form-control" id="busquedaLibro"
                                        placeholder="Título, Autor o ISBN">
                                </div>
                                <div class="col-md-3">
                                    <label for="categoriaFiltro" class="form-label">Categoría</label>
                                    <select class="form-select" id="categoriaFiltro">
                                        <option value="todas">Todas las categorías</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label for="disponibilidadFiltro" class="form-label">Disponibilidad</label>
                                    <select class="form-select" id="disponibilidadFiltro">
                                        <option value="todos">Todos</option>
                                        <option value="Disponible">Disponibles</option>
                                        <option value="No disponible">Agotados</option>
                                        <option value="Desactivado">Desactivados</option>
                                    </select>
                                </div>
                                <div class="col-md-2 d-flex align-items-end">
                                    <button class="btn btn-primary w-100" onclick="filtrarLibros('<?php echo $_SESSION['tipoUsuario'] ?>')">
                                        <i class="fas fa-search me-1"></i>Buscar
                                    </button>
                                </div>
                                <div class="col-md-2 d-flex align-items-end">
                                    <button class="btn btn-secondary w-100" onclick="limpiarFiltros('<?php echo $_SESSION['tipoUsuario'] ?>')">
                                        <i class="fas fa-times me-1"></i>Limpiar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Botón para agregar -->
                    <?php if ($_SESSION['tipoUsuario'] === 'Administrador') { ?>
                        <button class="btn btn-success mb-4" id="agregarLibro"">
                        <i class=" fas fa-plus me-1"></i>Agregar Libro
                        </button>
                    <?php } ?>
                    <!-- Tabla -->
                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table me-1"></i>
                            Catálogo de Libros
                        </div>
                        <div class="card-body">
                            <table id="tablaLibros" class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Título</th>
                                        <th>Autor</th>
                                        <th>ISBN</th>
                                        <th>Categoría</th>
                                        <th>Disponibilidad</th>
                                        <?php if ($_SESSION['tipoUsuario'] === 'Administrador') { ?>
                                            <th>Cantidad</th>
                                            <th>Acciones</th>
                                        <?php } ?>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($libros as $filaLibro) { ?>
                                        <tr>
                                            <td><?= htmlspecialchars($filaLibro['tituloLibro']); ?></td>
                                            <td><?= htmlspecialchars($filaLibro['autorLibro']); ?></td>
                                            <td><?= htmlspecialchars($filaLibro['isbnLibro']); ?></td>
                                            <td>
                                                <button class="btn btn-sm btn-info text-white" onclick="sweetLibroVerCategoria(<?= $filaLibro['idLibro']; ?>)">
                                                    <i class="bi bi-eye"></i> Detalles
                                                </button>
                                            </td>
                                            <td>
                                                <?php
                                                switch ($filaLibro['disponibilidadLibro']) {
                                                    case 'Disponible':
                                                        echo '<span class="badge bg-success">Disponible</span>';
                                                        break;
                                                    case 'No disponible':
                                                        echo '<span class="badge bg-warning">Agotado</span>';
                                                        break;
                                                    case 'Desactivado':
                                                        echo '<span class="badge bg-danger">Desactivado</span>';
                                                        break;
                                                    default:
                                                        # code...
                                                        break;
                                                } ?>
                                            </td>
                                            <?php if ($_SESSION['tipoUsuario'] === 'Administrador') { ?>
                                                <td><?= htmlspecialchars($filaLibro['cantidadLibro']); ?></td>
                                                <td class="d-flex justify-content-between w-100">
                                                    <button class="btn btn-warning btn-sm" onclick="sweetLibroEditar(<?= $filaLibro['idLibro']; ?>)">
                                                        <i class="bi bi-pencil-square"></i> Editar
                                                    </button>
                                                    <?php
                                                    switch ($filaLibro['disponibilidadLibro']) {
                                                        case 'Desactivado':
                                                            echo '  <button class="btn btn-success btn-sm w-50" onclick="sweetLibroActivar(' . $filaLibro['idLibro'] . ')">
                                                                        <i class="bi bi-check-circle"></i> Activar
                                                                    </button>';
                                                            break;
                                                        default:
                                                            echo '  <button class="btn btn-danger btn-sm" onclick="sweetLibroEliminar(' . $filaLibro['idLibro'] . ')">
                                                                        <i class="bi bi-trash"></i> Eliminar
                                                                    </button>';
                                                            break;
                                                    }
                                                    ?>

                                                </td>
                                            <?php } ?>
                                        </tr>
                                    <?php } ?>
                                </tbody>
                            </table>
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
    <!-- Scripts -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/scripts.js"></script>
    <script src="js/sweetAlerts.js"></script>
    <script src="js/busquedaLibros.js"></script>
</body>

</html>