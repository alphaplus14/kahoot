<?php
//! Funcion para iniciar sesion
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['pass'], $_POST['correo']) && !empty($_POST['pass']) && !empty($_POST['correo'])) {
        require_once '../models/MySQL.php';
        $mysql = new MySQL();
        $mysql->conectar();
        //* Sanitizacion de correo (la PassWord no se sanitiza nunca)
        $correo = filter_var(trim($_POST['correo']), FILTER_SANITIZE_EMAIL);
        $pass = $_POST['pass'];
        $resultado = $mysql->efectuarConsulta("Select * from tbl_empleados join tbl_cargos on tbl_cargos.id_cargo = tbl_empleados.fk_cargo_empleado where tbl_empleados.correo_empleado = '$correo';");
        //* Verificaciones
        if ($usuario = mysqli_fetch_assoc($resultado)) {
            if ($usuario['estado_empleado'] == 'Activo') {
                if (password_verify($pass, $usuario['pass_empleado'])) {
                    //* Se guardan credenciales en variable global $_SESSION
                    $_SESSION['usuario_id'] = $usuario['id_empleado'];
                    $_SESSION['correo'] = $usuario['correo_empleado'];
                    $_SESSION['nombre'] = $usuario['nombre_completo_empleado'];
                    $_SESSION['id_cargo'] = $usuario['fk_cargo_empleado'];
                    $_SESSION['nombre_cargo'] = $usuario['nombre_cargo'];
                    //* Exito
                    header("Location: ../dashboard.php");
                    exit();
                } else {
                    $mysql->desconectar();
                    header("Location: ../index.php?error=pass");
                    exit();
                }
            } else {
                $mysql->desconectar();
                header("Location: ../index.php?error=user");
                exit();
            }
        }
        $mysql->desconectar();
        header("Location: ../index.php?error=1");
        exit();
    } else {
        header("Location: ../index.php?error=datos");
        exit();
    }
}