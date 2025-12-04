<?php
//! Funcion para iniciar sesion
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['passLogin'], $_POST['usuarioLogin']) && !empty($_POST['passLogin']) && !empty($_POST['usuarioLogin'])) {
        require_once '../models/MySQL.php';
        $mysql = new MySQL();
        $mysql->conectar();
        //* Sanitizacion de email (la PassWord no se sanitiza nunca)
        $nombreUsuario = filter_var(trim($_POST['usuarioLogin']), FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        $pass = $_POST['passLogin'];
        try {
            $resultado = $mysql->efectuarConsulta("SELECT * FROM usuario JOIN tipoUsuario on tipoUsuario.idTipoUsuario = usuario.fkTipoUsuario where usuario.nombreUsuario = '$nombreUsuario'; ");
        } catch (\Throwable $th) {
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'Error al traer datos de usuario', 'error' => $th]);
        };
        //* Verificaciones
        if ($usuario = mysqli_fetch_assoc($resultado)) {
            if ($usuario['fkEstadoUsuario'] == 1) {
                if (password_verify($pass, $usuario['passUsuario'])) {
                    //* Se guardan credenciales en variable global $_SESSION
                    $_SESSION['idUsuario'] = $usuario['idUsuario'];
                    $_SESSION['emailUsuario'] = $usuario['emailUsuario'];
                    $_SESSION['nombreUsuario'] = $usuario['nombreUsuario'];
                    $_SESSION['idTipoUsuario'] = $usuario['idTipoUsuario'];
                    $_SESSION['tipoUsuario'] = $usuario['tipoUsuario'];
                    $_SESSION['apellidoUsuario'] = $usuario['apellidoUsuario'];
                    //* Exito
                    if ($_SESSION['tipoUsuario'] == 'Administrador') {
                        header("Location: ../dist/dashboard.php");
                        exit();
                    } else {
                        header("Location: ../dist/libros.php");
                        exit();
                    }
                } else {
                    $mysql->desconectar();
                    header("Location: ../dist/login.php?error=true&message=Contraseña incorrecta, intenta nuevamente!&title=Contraseña!");
                    exit();
                }
            } else {
                $mysql->desconectar();
                header("Location: ../dist/login.php?error=true&message=Usuario inactivo!&title=Error!");
                exit();
            }
        }
        $mysql->desconectar();
        header("Location: ../dist/login.php?error=true&message=Usuario no encontrado, registrate!&title=Error!");
        exit();
    } else {
        header("Location: ../dist/login.php?error=true&message=Ingrese todos los campos requeridos!&title=Faltan campos!");
        exit();
    }
}
