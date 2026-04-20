<?php
// Plantilla de configuración. Copia este archivo como `config.php` y
// rellena los valores reales. El archivo `config.php` está en .gitignore
// para que las credenciales nunca viajen al repositorio.
return [
    'db' => [
        'host'     => 'localhost',
        'dbname'   => 'kahoot',
        'user'     => 'root',
        'password' => '',
        'charset'  => 'utf8mb4',
    ],
    'app' => [
        // 'dev' muestra errores en pantalla; 'prod' los oculta y solo loguea.
        'env'      => 'dev',
        // Archivo donde se acumulan los errores. Si está vacío usa el error_log
        // del sistema. Ruta relativa al root del proyecto.
        'log_file' => 'logs/app.log',
    ],
];
