<?php
session_start();
if (!isset($_SESSION['id_usuario'])) {
    header('Location: index.php?error=true&message=No puedes acceder a esta pagina, inicia sesion con un usuario valido!&title=Acceso denegado');
    exit;
}
if (isset($_SESSION['estado_usuario']) && $_SESSION['estado_usuario'] != 'Activo') {
    header("Location: index.php?error=true&message=Acceso denegado, solo se aceptan usuarios activos!&title=Acceso denegado!");
    exit;
}
require_once '../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
$sql = "SELECT categorias.id_categoria, categorias.nombre_categoria, COUNT(cuestionario.categorias_id_categoria) as conteo, categorias.estado_categoria 
FROM categorias LEFT JOIN cuestionario ON cuestionario.categorias_id_categoria = categorias.id_categoria
GROUP BY categorias.id_categoria;";
$stmt = $mysql->getConexion()->query($sql);

$categorias = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $categorias[] = $row;
}
$mysql->desconectar();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Categorias - ¿Y esa Pregunta?</title>
    <link href="https://cdn.jsdelivr.net/npm/simple-datatables@7.1.2/dist/style.min.css" rel="stylesheet" />
    <link href="../css/styles.css" rel="stylesheet" />
    <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="../css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.5.0/css/responsive.dataTables.min.css">
</head>

<body class="sb-nav-fixed">
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
                        <div class="collapse show" id="collapseJuegos" data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link active" href="categorias.php">Categorias</a>
                                <a class="nav-link" href="bancoPreguntas.php">Banco de Preguntas</a>
                            </nav>
                        </div>
                        <a class="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapsePartidas"
                            aria-expanded="true" aria-controls="collapsePartidas">
                            <div class="sb-nav-link-icon"><i class="bi bi-controller"></i></div>
                            Partidas
                            <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                        </a>
                        <div class="collapse" id="collapsePartidas" data-bs-parent="#sidenavAccordion">
                            <nav class="sb-sidenav-menu-nested nav">
                                <a class="nav-link" href="generarPIN.php">Generar PIN</a>
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
                    <h1 class="mt-4">Configurar Juego</h1>
                    <ol class="breadcrumb mb-4">
                        <li class="breadcrumb-item active">Categorias</li>
                    </ol>
                    <button class="btn btn-success mb-4" id="categoriaInsertar">➕ Insertar Categoria</button>
                    <div class="card mb-4">
                        <div class="card-header">
                            <i class="fas fa-table me-1"></i>
                            Categorias
                        </div>
                        <div class="card-body">
                            <table id="tablaCategorias" class="table table-striped table-hover table-bordered table-sm align-middle text-center">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Preguntas asociadas</th>
                                        <th>Estado</th>
                                        <th class="text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($categorias as $filaCategoria): ?>
                                        <tr>
                                            <td><?php echo $filaCategoria['id_categoria']; ?></td>
                                            <td><?php echo $filaCategoria['nombre_categoria']; ?></td>
                                            <td><?php echo $filaCategoria['conteo']; ?></td>
                                            <td class="justify-content-center"><?php echo '<span class="badge p-2 fs-6 bg-' . (($filaCategoria['estado_categoria'] === 'Activo') ? 'success">✔ ' : 'danger">❌ ')  . $filaCategoria['estado_categoria'] . '</span>' ?></td>
                                            <td class="text-center acciones">
                                                <div class="d-flex flex-column flex-md-row justify-content-center gap-1"><?php if ($filaCategoria['estado_categoria'] == "Activo") {
                                                                                                                                echo '<button class="btn btn-danger categoriaDesactivar btn-sm w-100">❌ Desactivar</button>';
                                                                                                                            } else {
                                                                                                                                echo '<button class="btn btn-success categoriaActivar btn-sm w-100">✔ Activar</a>';
                                                                                                                            }; ?>
                                                    <?php echo '<button class="btn btn-warning ms-2 categoriaEditar btn-sm">📝 Editar</button>'; ?>
                                                </div>
                                            </td>
                                        </tr>
                                    <?php endforeach; ?>
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
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="../js/datatables/datatables.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.5.0/js/dataTables.responsive.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script src="../js/scripts.js"></script>
    <script src="../js/categorias/categorias.js" type="module"></script>
    <script src="../js/general/scriptsGenerales.js" type="module"></script>
</body>

</html>