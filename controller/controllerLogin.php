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
            $sql = "SELECT * FROM usuarios WHERE nombre_usuario = :nombre_usuario";
            $stmt = $mysql->getConexion()->prepare($sql);
            $stmt->bindParam(':nombre_usuario', $nombreUsuario, PDO::PARAM_STR);
            $stmt->execute();


            $usuario_data = $stmt->fetch(PDO::FETCH_ASSOC);

            //* Verificaciones
            if ($usuario_data) {
                // Verificar contraseña usando password_verify
                if (password_verify($pass, $usuario_data['password_usuario'])) {
                    // Guardar datos en sesión
                    //* Se guardan credenciales en variable global $_SESSION
                    $_SESSION['id_usuario'] = $usuario_data['id_usuario'];
                    $_SESSION['correo_usuario'] = $usuario_data['correo_usuario'];
                    $_SESSION['nombre_usuario'] = $usuario_data['nombre_usuario'];
                    $_SESSION['estado_usuario'] = $usuario_data['estado_usuario'];
                    //* Exito
                    $mysql->desconectar();
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
        } catch (PDOException $e) {
            $mysql->desconectar();
            error_log("Error en login: " . $e->getMessage());
            header("Location: ../index.html?error=500");
            exit();
        }
    } else {
        header("Location: ../dist/views/login.php?error=true&message=Ingrese todos los campos requeridos!&title=Faltan campos!");
        exit();
    }
}
