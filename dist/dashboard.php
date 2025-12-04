<?php
session_start();
if (!$_SESSION) {
    header('Location: login.php?error=true&message=No puedes acceder a esta pagina, inicia sesion con un usuario valido!&title=Acceso denegado');
    exit;
}
if ($_SESSION['tipoUsuario'] != 'Administrador') {
    header("Location: libros.php?error=true&message=Acceso denegado, solo se aceptan administradores!&title=Acceso denegado!");
    exit;
}
require_once '../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();

$resultado = $mysql->efectuarConsulta("SELECT * FROM usuario 
JOIN tipoUsuario ON tipoUsuario.idTipoUsuario = usuario.fkTipoUsuario
JOIN estado ON estado.idEstado = usuario.fkEstadoUsuario");
$usuario = [];
while ($fila = mysqli_fetch_assoc($resultado)) {
    $usuario[] = $fila;
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
    <title>Dashboard - ¿Y esa pregunta?</title>
    <link href="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/style.min.css" rel="stylesheet" />
    <link href="css/styles.css" rel="stylesheet" />
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.5.0/css/responsive.dataTables.min.css">
</head>

<body class="sb-nav-fixed">
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
                        <div class="collapse" id="collapsePages" data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="libros.php">Búsqueda de Libros</a>
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
                    <h1 class="mt-4">Panel de Administracion</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">Panel de Administracion</li>
                    </ol>
                    <button class="btn btn-success mb-4" id="usuarioInsertar"><i class="bi bi-person-add"></i> Insertar Usuario</button>
                    <button class="btn btn-success mb-4" id="generarArchivos"><i class="bi bi-folder-plus"></i> Generar Archivos</button>
                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table me-1"></i>
                            Administradores
                        </div>
                        <div class="card-body">
                            <table id="tablaEmpleados">
                                <thead>
                                    <tr>

                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Email</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Email</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    <?php foreach ($usuario as $filaUsuario) {
                                        if ($filaUsuario['tipoUsuario'] != 'Cliente') {  ?>
                                            <tr>

                                                <td><?php echo $filaUsuario['nombreUsuario']; ?></td>
                                                <td><?php echo $filaUsuario['apellidoUsuario']; ?></td>
                                                <td><?php echo $filaUsuario['emailUsuario']; ?></td>
                                                <td><?php echo '<span class="badge p-2 ms-5 mt-1 fs-6  bg-' . (($filaUsuario['tipoEstado'] === 'Activo') ? 'success"><i class="bi bi-check-circle"></i> ' : 'danger"><i class="bi bi-x-circle"></i> ')  . $filaUsuario['tipoEstado'] . '</span>' ?></td>
                                                <td class="d-flex justify-content-between w-100"><?php if ($filaUsuario['tipoEstado'] == "Activo") {
                                                                                                        echo '<button onclick="sweetUsuarioDesactivar(' . $filaUsuario['idUsuario'] . ')" class="btn btn-danger"><i class="bi bi-person-fill-x"></i> Desactivar</button>';
                                                                                                    } else {
                                                                                                        echo '<button onclick="sweetUsuarioActivar(' . $filaUsuario['idUsuario'] . ')" class="btn btn-success"><i class="bi bi-person-fill-check"></i> Activar</a>';
                                                                                                    }; ?>
                                                    <?php echo '<button onclick="sweetUsuarioEditar(' . $filaUsuario['idUsuario'] . ')" class="btn btn-warning ms-2" id="usuarioEditar"><i class="bi bi-person-video2"></i> Editar</button>'; ?>
                                                    <!-- Se tiene que quemar el evento por que la tabla no deja asignar con addEventListener -->
                                                </td>
                                            </tr>
                                    <?php }
                                    } ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table me-1"></i>
                            Clientes
                        </div>
                        <div class="card-body">
                            <table id="tablaClientes">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Email</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>

                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Email</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    <?php foreach ($usuario as $filaUsuario) {
                                        if ($filaUsuario['tipoUsuario'] == 'Cliente') { ?>
                                            <tr>
                                                <td><?php echo $filaUsuario['nombreUsuario']; ?></td>
                                                <td><?php echo $filaUsuario['apellidoUsuario']; ?></td>
                                                <td><?php echo $filaUsuario['emailUsuario']; ?></td>
                                                <td><?php echo '<span class="badge p-2 ms-5 mt-1 fs-6 bg-' . (($filaUsuario['tipoEstado'] === 'Activo') ? 'success"><i class="bi bi-check-circle"></i> ' : 'danger"><i class="bi bi-x-circle"></i> ')  . $filaUsuario['tipoEstado'] . '</span>' ?></td>
                                                <td class="d-flex justify-content-between w-100"><?php if ($filaUsuario['tipoEstado'] == "Activo") {
                                                                                                        echo '<button onclick="sweetUsuarioDesactivar(' . $filaUsuario['idUsuario'] . ')" class="btn btn-danger"><i class="bi bi-person-fill-x"></i> Desactivar</button>';
                                                                                                    } else {
                                                                                                        echo '<button onclick="sweetUsuarioActivar(' . $filaUsuario['idUsuario'] . ')" class="btn btn-success"><i class="bi bi-person-fill-check"></i> Activar</a>';
                                                                                                    }; ?>
                                                    <?php echo '<button onclick="sweetUsuarioEditar(' . $filaUsuario['idUsuario'] . ')" class="btn btn-warning ms-2" id="usuarioEditar"><i class="bi bi-person-video2"></i> Editar</button>'; ?>
                                                    <!-- Se tiene que quemar el evento por que la tabla no deja asignar con addEventListener -->
                                                </td>
                                            </tr>
                                    <?php }
                                    }
                                    ?>
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
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script src="js/scripts.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.5.0/js/dataTables.responsive.min.js"></script>
    <script src="js/sweetAlerts.js"></script>
</body>

</html>