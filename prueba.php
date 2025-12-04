<?php
// Asegúrate de usar esto ANTES del INSERT
$fechaPrestamo = date('Y-m-d');
$fechaDevolucion = date('Y-m-d', strtotime('+7 days'));

// Para verificar qué valores tienes:
var_dump($fechaPrestamo);    // Debe mostrar: string '2025-11-01'
var_dump($fechaDevolucion);  // Debe mostrar: string '2025-11-08'
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <form>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="a" name="opciones">
            <label class="form-check-label">Opción A</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="b" name="opciones" checked>
            <label class="form-check-label">Opción B</label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="c" name="opciones">
            <label class="form-check-label">Opción C</label>
        </div>
        <button id="pruebaButton" type="button">Obtener valores</button>
    </form>

    <script src="dist/js/prueba.js"></script>
</body>

</html>