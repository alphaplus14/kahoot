<?php
require_once __DIR__ . '/../../includes/auth.php';
header('Content-Type: application/json');
csrf_validate();

require_once __DIR__ . '/../../models/MySQL.php';
try {
    $mysql = new MySQL();
    $mysql->conectar();
    $pinPartida = filter_input(INPUT_POST, 'pinIngresado', FILTER_VALIDATE_INT);
    if ($pinPartida === false || $pinPartida === null) {
        echo json_encode([
            'success' => false,
            'message' => 'PIN inválido'
        ]);
        exit;
    }
    //consulta para verificar el pin (IN en vez de AND/OR para evitar
    //que la precedencia deje pasar cualquier partida en estado 'Jugando')
    // Sólo se puede unir con el PIN mientras el organizador no ha pulsado "Iniciar juego".
    $stmt = $mysql->getConexion()->prepare(
        "SELECT * FROM partidas
         WHERE pin_partida = :pin_partida
           AND estado_partida = 'Esperando'"
    );
    $stmt->bindParam(':pin_partida', $pinPartida, PDO::PARAM_INT);
    $stmt->execute();
    $partida = $stmt->fetch(PDO::FETCH_ASSOC);
    $_SESSION['pinPartida'] = $pinPartida;
    if ($partida) {
        echo json_encode([
            'success' => true,
            'data' => $partida
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'PIN inválido o partida no disponible'
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        "error" => true,
        "message" => $e->getMessage(),
    ]);
} finally {
    // Cierre de conexion
    if (isset($mysql)) {
        $mysql->desconectar();
    }
}
