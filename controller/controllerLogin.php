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
            $resultado = $mysql->efectuarConsulta("SELECT * FROM usuarios where nombre_usuario='".$nombreUsuario."'");
        } catch (\Throwable $th) {
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'Error al traer datos de usuario', 'error' => $th]);
        };

        //* Verificaciones
        if ($usuario = mysqli_fetch_assoc($resultado)) {
                if (password_verify($pass, $usuario['password_usuario'])) {
                    //* Se guardan credenciales en variable global $_SESSION
                    $_SESSION['id_usuario'] = $usuario['id_usuario'];
                    $_SESSION['correo_usuario'] = $usuario['correo_usuario'];
                    $_SESSION['nombre_usuario'] = $usuario['nombre_usuario'];
                    //* Exito
                        header("Location: ../dist/views/dashboard.php");
                        exit();
                } else {
                    $mysql->desconectar();
                    header("Location: ../dist/views/login.php?error=true&message=Contraseña incorrecta, intenta nuevamente!&title=Contraseña!");
                    exit();
                }
            } else {
                $mysql->desconectar();
                header("Location: ../dist/views/login.php?error=true&message=Usuario inactivo!&title=Error!");
                exit();
            }
    } else {
        header("Location: ../dist/views/login.php?error=true&message=Ingrese todos los campos requeridos!&title=Faltan campos!");
        exit();
    }
}
