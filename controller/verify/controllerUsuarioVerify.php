<?php
// Usado por el flujo de jugador (no requiere login, sí requiere sesión de jugador).
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/jugador_campos.php';
header('Content-Type: application/json');

$nombre    = isset($_POST['nombre']) ? jugador_normalizar_campo((string)$_POST['nombre'], 40, 2) : null;
$ficha     = isset($_POST['ficha']) ? jugador_normalizar_campo((string)$_POST['ficha'], 40, 1) : null;
$idPartida = filter_input(INPUT_POST, 'idPartida', FILTER_VALIDATE_INT);

if ($nombre === null || $ficha === null || !$idPartida) {
    echo json_encode(false);
    exit;
}

require_once __DIR__ . '/../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
try {
    $stmt = $mysql->getConexion()->prepare(
        'SELECT 1 FROM jugadores
         WHERE nombre_jugador      = :nombre
           AND ficha_jugador       = :ficha
           AND partidas_id_partida = :idPartida
         LIMIT 1'
    );
    $stmt->bindParam(':nombre',    $nombre,    PDO::PARAM_STR);
    $stmt->bindParam(':ficha',     $ficha,     PDO::PARAM_STR);
    $stmt->bindParam(':idPartida', $idPartida, PDO::PARAM_INT);
    $stmt->execute();
    echo json_encode($stmt->fetch(PDO::FETCH_ASSOC) === false);
} catch (Throwable $th) {
    error_log('Verify jugador: ' . $th->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al verificar jugador']);
} finally {
    $mysql->desconectar();
}
