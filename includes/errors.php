<?php
// Configuración global de errores y excepciones.
// Se registra lo antes posible, idealmente desde auth.php.
//
// En modo 'dev' se muestran los errores en pantalla (útil para XAMPP local).
// En modo 'prod' se ocultan y sólo se loguean en `log_file`. Nunca se debería
// exponer un stack trace al usuario final en producción.

(static function (): void {
    // Evitar doble registro si el archivo se incluye más de una vez.
    if (defined('APP_ERRORS_REGISTERED')) {
        return;
    }
    define('APP_ERRORS_REGISTERED', true);

    $config = [];
    $configPath = __DIR__ . '/../config/config.php';
    if (is_file($configPath)) {
        $loaded = require $configPath;
        if (is_array($loaded)) {
            $config = $loaded;
        }
    }

    $env     = $config['app']['env']      ?? 'dev';
    $logFile = $config['app']['log_file'] ?? 'logs/app.log';
    $rootDir = realpath(__DIR__ . '/..');

    // Resuelve la ruta de log y crea la carpeta si no existe.
    if (!empty($logFile)) {
        $logPath = (preg_match('~^([A-Za-z]:[\\\\/]|/)~', $logFile)) ? $logFile : $rootDir . DIRECTORY_SEPARATOR . $logFile;
        $logDir  = dirname($logPath);
        if (!is_dir($logDir)) {
            @mkdir($logDir, 0775, true);
        }
        ini_set('log_errors', '1');
        ini_set('error_log', $logPath);
    }

    error_reporting(E_ALL);

    if ($env === 'prod') {
        ini_set('display_errors', '0');
        ini_set('display_startup_errors', '0');
    } else {
        ini_set('display_errors', '1');
        ini_set('display_startup_errors', '1');
    }

    /**
     * Devuelve true si la petición se está sirviendo como JSON (fetch/AJAX).
     */
    $esRespuestaJson = static function (): bool {
        $ct = $_SERVER['HTTP_ACCEPT'] ?? '';
        if (stripos($ct, 'application/json') !== false) {
            return true;
        }
        // Si el script ya decidió responder JSON (header Content-Type seteado)
        foreach (headers_list() as $header) {
            if (stripos($header, 'Content-Type: application/json') !== false) {
                return true;
            }
        }
        return false;
    };

    $enviarRespuestaError = static function (string $mensaje) use ($env, $esRespuestaJson): void {
        if (headers_sent()) {
            return;
        }
        http_response_code(500);
        if ($esRespuestaJson()) {
            header('Content-Type: application/json');
            echo json_encode([
                'success' => false,
                'message' => $env === 'prod' ? 'Error interno del servidor' : $mensaje,
            ]);
            return;
        }
        header('Content-Type: text/html; charset=utf-8');
        $texto = $env === 'prod'
            ? 'Ha ocurrido un error. Intenta de nuevo en unos instantes.'
            : 'Error: ' . htmlspecialchars($mensaje, ENT_QUOTES, 'UTF-8');
        echo '<!doctype html><meta charset="utf-8"><title>Error</title>' .
             '<div style="font-family:system-ui;max-width:680px;margin:48px auto;padding:24px;border:1px solid #dee2e6;border-radius:12px;background:#fff8f8;color:#333">' .
             '<h1 style="margin-top:0;color:#b00020">Ha ocurrido un error</h1>' .
             '<p>' . $texto . '</p></div>';
    };

    // Convierte los errores de PHP en ErrorException, salvo los silenciados con @.
    set_error_handler(static function (int $severity, string $message, string $file, int $line): bool {
        if (!(error_reporting() & $severity)) {
            return false;
        }
        throw new ErrorException($message, 0, $severity, $file, $line);
    });

    // Captura cualquier excepción no atrapada y devuelve una respuesta decente.
    set_exception_handler(static function (Throwable $e) use ($enviarRespuestaError): void {
        error_log(sprintf(
            "[uncaught] %s: %s en %s:%d\n%s",
            get_class($e),
            $e->getMessage(),
            $e->getFile(),
            $e->getLine(),
            $e->getTraceAsString()
        ));
        $enviarRespuestaError(get_class($e) . ': ' . $e->getMessage());
    });

    // Errores fatales (parse errors, memoria, etc.) que no pasan por los handlers.
    register_shutdown_function(static function () use ($enviarRespuestaError): void {
        $error = error_get_last();
        if ($error === null) {
            return;
        }
        $fatales = E_ERROR | E_PARSE | E_CORE_ERROR | E_COMPILE_ERROR | E_USER_ERROR;
        if (($error['type'] & $fatales) === 0) {
            return;
        }
        error_log(sprintf(
            "[fatal] %s en %s:%d",
            $error['message'],
            $error['file'],
            $error['line']
        ));
        $enviarRespuestaError($error['message']);
    });
})();
