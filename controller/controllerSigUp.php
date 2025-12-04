<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (
        isset($_POST['usuarioNombre']) &&
        isset($_POST['usuarioApellido']) &&
        isset($_POST['usuarioEmail']) &&
        isset($_POST['usuarioPass']) &&
        !empty($_POST['usuarioNombre']) &&
        !empty($_POST['usuarioApellido']) &&
        !empty($_POST['usuarioEmail']) &&
        !empty($_POST['usuarioPass'])
    ) {
        require_once '../models/MySQL.php';
        $mysql = new MySQL();
        $mysql->conectar();
        $nombre = filter_var($_POST['usuarioNombre'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        $apellido = filter_var($_POST['usuarioApellido'], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        $email = filter_var($_POST['usuarioEmail'], FILTER_SANITIZE_EMAIL);
        try {
            $resultado = $mysql->efectuarConsulta("SELECT * FROM usuario WHERE emailUsuario = $email;");
        } catch (\Throwable $th) {
            header('Location: ../dist/registro.php?error=ErrorConsulta');
        }

        $datos = [];
        while ($row = mysqli_fetch_assoc($resultado)) {
            $datos = $row;
        }
        if (!$datos['emailUsuario']) {
            $pass = $_POST['usuarioPass'];
            $hash = password_hash($pass, PASSWORD_BCRYPT);
            try {
                $mysql->efectuarConsulta("INSERT INTO usuario VALUES(null, '$nombre', '$apellido', '$email', '$hash', 1, 2);");
                header('Location: ../dist/login.php');
            } catch (\Throwable $th) {
                header('Location: ../dist/registro.php?error=ErrorConsulta');
            }
        } else {
            header('Location: ../dist/registro.php?error=EmailRepetido');
        }
    }
}
