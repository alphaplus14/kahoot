<?php
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/jugador_campos.php';
header('Content-Type: application/json');
csrf_validate();

if (
    !isset($_POST['nombreJugador'], $_POST['fichaJugador'], $_POST['idPartida']) ||
    $_POST['nombreJugador'] === '' ||
    $_POST['fichaJugador'] === '' ||
    $_POST['idPartida'] === ''
) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Faltan datos']);
    exit;
}

$nombre    = jugador_normalizar_campo((string)$_POST['nombreJugador'], 40, 2);
$ficha     = jugador_normalizar_campo((string)$_POST['fichaJugador'], 40, 1);
$idPartida = filter_var($_POST['idPartida'], FILTER_VALIDATE_INT);

if ($idPartida === false || $idPartida === null) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'ID de partida inválido']);
    exit;
}

if ($nombre === null || $ficha === null) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Nombre (mín. 2 caracteres) y ficha son obligatorios. Evita solo espacios o caracteres vacíos.',
    ]);
    exit;
}

require_once __DIR__ . '/../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();

try {
    $chk = $mysql->getConexion()->prepare(
        'SELECT id_partida FROM partidas WHERE id_partida = :id AND estado_partida = :estado LIMIT 1'
    );
    $chk->bindValue(':id', $idPartida, PDO::PARAM_INT);
    $chk->bindValue(':estado', 'Esperando', PDO::PARAM_STR);
    $chk->execute();
    if ($chk->fetch(PDO::FETCH_ASSOC) === false) {
        http_response_code(409);
        echo json_encode([
            'success' => false,
            'message' => 'La partida ya comenzó o no admite más jugadores. Pide otro PIN al organizador.',
        ]);
        exit;
    }

    $sql  = 'INSERT INTO jugadores (nombre_jugador, ficha_jugador, partidas_id_partida)
             VALUES (:nombre, :ficha, :idPartida)';
    $stmt = $mysql->getConexion()->prepare($sql);
    $stmt->bindParam(':nombre',    $nombre,    PDO::PARAM_STR);
    $stmt->bindParam(':ficha',     $ficha,     PDO::PARAM_STR);
    $stmt->bindParam(':idPartida', $idPartida, PDO::PARAM_INT);
    $stmt->execute();

    $_SESSION['id_jugador']      = (int)$mysql->getConexion()->lastInsertId();
    $_SESSION['idPartida']       = $idPartida;
    $_SESSION['fichaJugador']    = $ficha;
    $_SESSION['nombreJugador']   = $nombre;

    echo json_encode(['success' => true, 'message' => 'Jugador registrado exitosamente!']);
} catch (Throwable $th) {
    error_log('Error insertar jugador: ' . $th->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al registrar jugador']);
} finally {
    $mysql->desconectar();
}
