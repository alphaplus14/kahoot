<?php
// Clase para manejar la conexión a la base de datos con PDO
class MySQL
{
    private $conexion;

    public function conectar()
    {
        $configPath = __DIR__ . '/../config/config.php';
        if (!file_exists($configPath)) {
            die('Error de configuración: falta config/config.php. Copia config/config.example.php y ajusta los valores.');
        }
        $config = require $configPath;
        $db = $config['db'] ?? [];

        $host     = $db['host']     ?? 'localhost';
        $dbname   = $db['dbname']   ?? 'kahoot';
        $usuario  = $db['user']     ?? 'root';
        $contrasena = $db['password'] ?? '';
        $charset  = $db['charset']  ?? 'utf8mb4';

        $dsn = "mysql:host={$host};dbname={$dbname};charset={$charset}";

        try {
            $this->conexion = new PDO($dsn, $usuario, $contrasena, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ]);
        } catch (PDOException $e) {
            error_log('Error de conexión BD: ' . $e->getMessage());
            die('Error de conexión a la base de datos.');
        }
    }

    public function desconectar()
    {
        $this->conexion = null;
    }

    public function getConexion()
    {
        return $this->conexion;
    }
}
