<?php
session_start();
if ($_SESSION['tipoUsuario'] != 'Administrador') {
    echo $_SESSION['tipoUsuario'];
}
?>