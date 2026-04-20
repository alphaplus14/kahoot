<?php
// Helpers centralizados de sesión, autenticación y CSRF.
// Incluir este archivo al inicio de cada vista o controller.
// Es seguro incluirlo múltiples veces.

// Configurar el handler global de errores antes que cualquier otra cosa.
require_once __DIR__ . '/errors.php';

if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params([
        'lifetime' => 0,
        'path'     => '/',
        'httponly' => true,
        'samesite' => 'Lax',
        'secure'   => !empty($_SERVER['HTTPS']),
    ]);
    @ini_set('session.use_strict_mode', '1');
    session_start();
}

/**
 * Calcula la ruta al index.php de forma relativa al script actual.
 * Así el redirect funciona igual desde /index.php que desde /dist/views/*.php
 * o /controller/<sub>/*.php sin tener que pensarlo cada vez.
 */
function _auth_index_url(): string
{
    $scriptDir = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? ''));
    $scriptDir = rtrim($scriptDir, '/');
    // Detectamos la raíz del proyecto (donde vive index.php) buscando "kahoot"
    // Aquí asumimos que el proyecto está colgado de /kahoot (XAMPP). Si no,
    // la ruta relativa por defecto sigue funcionando desde dist/views y controller/*.
    if (strpos($scriptDir, '/kahoot') !== false) {
        $base = substr($scriptDir, 0, strpos($scriptDir, '/kahoot') + strlen('/kahoot'));
        return $base . '/index.php';
    }
    // Fallback: subir dos niveles (controller/<sub> o dist/views)
    return '../../index.php';
}

/**
 * Redirige al index con mensaje de error si no hay usuario logueado.
 */
function requireLogin(string $msg = 'No puedes acceder a esta página, inicia sesión con un usuario válido!', string $title = 'Acceso denegado'): void
{
    if (empty($_SESSION['id_usuario'])) {
        $url = _auth_index_url() . '?error=true&message=' . urlencode($msg) . '&title=' . urlencode($title);
        header("Location: {$url}");
        exit;
    }
}

/**
 * Exige login + que el usuario esté en estado 'Activo'.
 */
function requireActiveUser(): void
{
    requireLogin();
    if (($_SESSION['estado_usuario'] ?? '') !== 'Activo') {
        $url = _auth_index_url() . '?error=true&message=' . urlencode('Acceso denegado, solo se aceptan usuarios activos!') . '&title=' . urlencode('Acceso denegado');
        header("Location: {$url}");
        exit;
    }
}

/**
 * Versión JSON: devuelve 401 si no hay sesión válida.
 */
function requireLoginJson(): void
{
    if (empty($_SESSION['id_usuario'])) {
        http_response_code(401);
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Sesión inválida']);
        exit;
    }
}

function requireActiveUserJson(): void
{
    requireLoginJson();
    if (($_SESSION['estado_usuario'] ?? '') !== 'Activo') {
        http_response_code(403);
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Usuario inactivo']);
        exit;
    }
}

/* -------------------- CSRF -------------------- */

function csrf_token(): string
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Imprime <input type="hidden" name="_csrf" value="...">
 */
function csrf_field(): void
{
    $token = csrf_token();
    echo '<input type="hidden" name="_csrf" value="' . htmlspecialchars($token, ENT_QUOTES, 'UTF-8') . '">';
}

/**
 * Imprime <meta name="csrf-token" content="..."> para que el JS lo lea.
 */
function csrf_meta(): void
{
    $token = csrf_token();
    echo '<meta name="csrf-token" content="' . htmlspecialchars($token, ENT_QUOTES, 'UTF-8') . '">';
}

/**
 * Expone el token CSRF en JS de forma fiable (fallback si el meta no se lee bien).
 * Incluir antes de `csrf.js` o al menos antes de cualquier `csrfFetch`.
 */
function csrf_inline_script(): void
{
    $token = csrf_token();
    echo '<script>window.__CSRF_TOKEN__=' . json_encode($token, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) . ';</script>' . "\n";
}

/**
 * Token CSRF enviado en esta petición (POST o cabecera).
 * Cubre Apache con mod_rewrite (REDIRECT_HTTP_*), distintas mayúsculas y getallheaders().
 */
function csrf_request_token(): string
{
    if (isset($_POST['_csrf']) && is_string($_POST['_csrf'])) {
        $t = trim($_POST['_csrf']);
        if ($t !== '') {
            return $t;
        }
    }

    $candidates = [
        'HTTP_X_CSRF_TOKEN',
        'REDIRECT_HTTP_X_CSRF_TOKEN',
    ];
    foreach ($candidates as $key) {
        if (!empty($_SERVER[$key]) && is_string($_SERVER[$key])) {
            return trim($_SERVER[$key]);
        }
    }

    foreach ($_SERVER as $key => $value) {
        if (!is_string($value) || $value === '') {
            continue;
        }
        if (preg_match('/^HTTP_X_.*CSRF.*TOKEN$/i', (string)$key)) {
            return trim($value);
        }
    }

    if (function_exists('getallheaders')) {
        foreach (getallheaders() as $name => $value) {
            if (!is_string($name) || !is_string($value)) {
                continue;
            }
            if (strcasecmp($name, 'X-CSRF-Token') === 0) {
                return trim($value);
            }
        }
    }

    return '';
}

/**
 * Comprueba internamente si el CSRF es válido (no corta ejecución).
 */
function csrf_is_valid(): bool
{
    $token = csrf_request_token();
    if ($token === '' || !is_string($token)) {
        return false;
    }
    if (empty($_SESSION['csrf_token']) || !is_string($_SESSION['csrf_token'])) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Valida el token CSRF. Si falla, responde 403 JSON y corta la ejecución.
 * Busca el token en POST '_csrf' o en header 'X-CSRF-Token'.
 */
function csrf_validate(): void
{
    if (!csrf_is_valid()) {
        http_response_code(403);
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Token CSRF inválido o ausente']);
        exit;
    }
}

/**
 * Variante para flujos con redirección (forms tradicionales).
 */
function csrf_validate_redirect(string $redirectUrl): void
{
    if (!csrf_is_valid()) {
        header('Location: ' . $redirectUrl);
        exit;
    }
}
