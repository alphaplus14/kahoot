<?php
// El puntaje NUNCA se toma del POST: se lee de la sesión, que ha sido
// acumulada por controllerRegistrarRespuesta.php en el servidor.
require_once __DIR__ . '/../../includes/auth.php';
header('Content-Type: application/json');
csrf_validate();

if (
    empty($_SESSION['idPartida']) ||
    empty($_SESSION['nombreJugador']) ||
    empty($_SESSION['fichaJugador'])
) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Sesión de juego no válida']);
    exit;
}

$nombre    = $_SESSION['nombreJugador'];
$ficha     = $_SESSION['fichaJugador'];
$idPartida = filter_var($_SESSION['idPartida'], FILTER_VALIDATE_INT);
$puntos    = (int)($_SESSION['puntos_partida'] ?? 0);

if ($idPartida === false || $idPartida === null) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'ID de partida inválido']);
    exit;
}

require_once __DIR__ . '/../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();

try {
    $stmt = $mysql->getConexion()->prepare(
        'UPDATE jugadores
            SET puntaje_jugador = :puntos
          WHERE nombre_jugador      = :nombre
            AND ficha_jugador       = :ficha
            AND partidas_id_partida = :idPartida'
    );
    $stmt->bindParam(':nombre',    $nombre,    PDO::PARAM_STR);
    $stmt->bindParam(':ficha',     $ficha,     PDO::PARAM_STR);
    $stmt->bindParam(':idPartida', $idPartida, PDO::PARAM_INT);
    $stmt->bindParam(':puntos',    $puntos,    PDO::PARAM_INT);
    $stmt->execute();

    // Limpia solo el estado del juego. Si el organizador probó la partida en el mismo
    // navegador (misma PHPSESSID que su sesión de login), NO debemos hacer
    // session_destroy(): invalidaría el CSRF y el login en pinGenerado / dashboard.
    $keysJuego = [
        'id_jugador',
        'idPartida',
        'fichaJugador',
        'nombreJugador',
        'pinPartida',
        'preguntas_juego',
        'segundos_pregunta',
        'puntos_partida',
        'indice_pregunta_actual',
        'respuestas_registradas',
        'inicio_pregunta_servidor',
    ];
    foreach ($keysJuego as $k) {
        unset($_SESSION[$k]);
    }

    if (empty($_SESSION['id_usuario'])) {
        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], $params['secure'], $params['httponly']);
        }
        session_destroy();
    }

    echo json_encode([
        'success'      => true,
        'message'      => 'Datos guardados exitosamente, muchas gracias por jugar!',
        'puntos_total' => $puntos,
    ]);
} catch (Throwable $th) {
    error_log('Insertar puntos jugador: ' . $th->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al registrar puntaje']);
} finally {
    $mysql->desconectar();
}
