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
        // Asegura 4 bytes UTF-8 (emojis) en la sesión MySQL, no solo en el DSN.
        $initCharset = preg_match('/^[a-z0-9_]+$/i', (string) $charset) ? $charset : 'utf8mb4';
        $initCmd     = 'SET NAMES ' . $initCharset;
        if (strcasecmp((string) $initCharset, 'utf8mb4') === 0) {
            $initCmd .= ' COLLATE utf8mb4_unicode_ci';
        }

        try {
            $this->conexion = new PDO($dsn, $usuario, $contrasena, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
                PDO::MYSQL_ATTR_INIT_COMMAND => $initCmd,
            ]);
            if (strcasecmp((string) $initCharset, 'utf8mb4') === 0) {
                $this->conexion->exec('SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci');
            }
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
