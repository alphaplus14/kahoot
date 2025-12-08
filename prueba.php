<?php
require_once 'models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
//? Datos categorias
$resultadoCategorias = $mysql->efectuarConsulta("SELECT * FROM categorias;");
$categorias = [];
while ($row = mysqli_fetch_assoc($resultadoCategorias)) {
    $row['id_categoria'] = (int)$row['id_categoria'];
    $categorias = $row;
}
echo $categorias;