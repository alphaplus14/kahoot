<?php
require_once __DIR__ . '/../../includes/auth.php';
header('Content-Type: application/json');
requireActiveUserJson();
csrf_validate();

require_once __DIR__ . '/../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();

$segundos        = filter_input(INPUT_POST, 'segundos', FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 300]]);
$limitePreguntas = filter_input(INPUT_POST, 'limitePreguntas', FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 100]]);

if ($segundos === false || $segundos === null || $limitePreguntas === false || $limitePreguntas === null) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Parámetros inválidos']);
    exit;
}

$modoPost = isset($_POST['modo_juego']) ? trim((string)$_POST['modo_juego']) : 'normal';
$modo     = ($modoPost === 'muerte_subita') ? 'muerte_subita' : 'normal';

$intervaloElim = null;
if ($modo === 'muerte_subita') {
    $intervaloElim = filter_input(INPUT_POST, 'intervalo_eliminacion', FILTER_VALIDATE_INT);
    if (!in_array($intervaloElim, [5, 10], true)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Intervalo de eliminación inválido (elige 5 o 10 preguntas).']);
        exit;
    }
}

$fecha = date('Y-m-d H:i:s');

try {
    $pinPartida = null;
    $sqlCheck   = 'SELECT 1 FROM partidas WHERE pin_partida = :pin_partida';
    $stmtCheck  = $mysql->getConexion()->prepare($sqlCheck);
    for ($i = 0; $i < 20; $i++) {
        $candidato = random_int(100000, 999999);
        $stmtCheck->bindValue(':pin_partida', $candidato, PDO::PARAM_INT);
        $stmtCheck->execute();
        if ($stmtCheck->fetch(PDO::FETCH_ASSOC) === false) {
            $pinPartida = $candidato;
            break;
        }
    }
    if ($pinPartida === null) {
        throw new RuntimeException('No se pudo generar un PIN único, intenta de nuevo.');
    }

    $estado    = 'Esperando';
    $idUsuario = (int)($_SESSION['id_usuario'] ?? 0);
    $pdo       = $mysql->getConexion();

    $inserted = false;

    if ($modo === 'muerte_subita' && $intervaloElim !== null) {
        $sqlMs = 'INSERT INTO partidas
            (pin_partida, preguntas_limite_partida, estado_partida, fecha_partida, segundos_pregunta_partida, modo_juego, intervalo_eliminacion, usuarios_id_usuario)
            VALUES (:pin_partida, :limite_preguntas, :estado, :fecha, :segundos, :modo, :interv, :id_usuario)';
        try {
            $stmt = $pdo->prepare($sqlMs);
            $stmt->bindParam(':pin_partida', $pinPartida, PDO::PARAM_INT);
            $stmt->bindParam(':limite_preguntas', $limitePreguntas, PDO::PARAM_INT);
            $stmt->bindParam(':estado', $estado, PDO::PARAM_STR);
            $stmt->bindParam(':fecha', $fecha, PDO::PARAM_STR);
            $stmt->bindParam(':segundos', $segundos, PDO::PARAM_INT);
            $stmt->bindValue(':modo', $modo, PDO::PARAM_STR);
            $stmt->bindValue(':interv', (int)$intervaloElim, PDO::PARAM_INT);
            $stmt->bindValue(':id_usuario', $idUsuario, PDO::PARAM_INT);
            $stmt->execute();
            $inserted = true;
        } catch (PDOException $e) {
            if (stripos($e->getMessage(), 'Unknown column') === false) {
                throw $e;
            }
        }
        if (!$inserted) {
            try {
                $sqlMs2 = 'INSERT INTO partidas
                    (pin_partida, preguntas_limite_partida, estado_partida, fecha_partida, segundos_pregunta_partida, modo_juego, intervalo_eliminacion)
                    VALUES (:pin_partida, :limite_preguntas, :estado, :fecha, :segundos, :modo, :interv)';
                $stmt = $pdo->prepare($sqlMs2);
                $stmt->bindParam(':pin_partida', $pinPartida, PDO::PARAM_INT);
                $stmt->bindParam(':limite_preguntas', $limitePreguntas, PDO::PARAM_INT);
                $stmt->bindParam(':estado', $estado, PDO::PARAM_STR);
                $stmt->bindParam(':fecha', $fecha, PDO::PARAM_STR);
                $stmt->bindParam(':segundos', $segundos, PDO::PARAM_INT);
                $stmt->bindValue(':modo', $modo, PDO::PARAM_STR);
                $stmt->bindValue(':interv', (int)$intervaloElim, PDO::PARAM_INT);
                $stmt->execute();
                $inserted = true;
            } catch (PDOException $e2) {
                if (stripos($e2->getMessage(), 'Unknown column') === false) {
                    throw $e2;
                }
            }
        }
    }

    if ($modo === 'muerte_subita' && !$inserted) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Muerte súbita requiere columnas en la base de datos. Ejecuta en MySQL el archivo sql/add_muerte_subita.sql.',
        ]);
        exit;
    }

    if (!$inserted) {
        $sqlConUsuario = 'INSERT INTO partidas
                (pin_partida, preguntas_limite_partida, estado_partida, fecha_partida, segundos_pregunta_partida, usuarios_id_usuario)
                VALUES (:pin_partida, :limite_preguntas, :estado, :fecha, :segundos, :id_usuario)';
        try {
            $stmt = $pdo->prepare($sqlConUsuario);
            $stmt->bindParam(':pin_partida', $pinPartida, PDO::PARAM_INT);
            $stmt->bindParam(':limite_preguntas', $limitePreguntas, PDO::PARAM_INT);
            $stmt->bindParam(':estado', $estado, PDO::PARAM_STR);
            $stmt->bindParam(':fecha', $fecha, PDO::PARAM_STR);
            $stmt->bindParam(':segundos', $segundos, PDO::PARAM_INT);
            $stmt->bindValue(':id_usuario', $idUsuario, PDO::PARAM_INT);
            $stmt->execute();
        } catch (PDOException $e) {
            if (stripos($e->getMessage(), 'Unknown column') === false) {
                throw $e;
            }
            $sql = 'INSERT INTO partidas
                    (pin_partida, preguntas_limite_partida, estado_partida, fecha_partida, segundos_pregunta_partida)
                    VALUES (:pin_partida, :limite_preguntas, :estado, :fecha, :segundos)';
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':pin_partida', $pinPartida, PDO::PARAM_INT);
            $stmt->bindParam(':limite_preguntas', $limitePreguntas, PDO::PARAM_INT);
            $stmt->bindParam(':estado', $estado, PDO::PARAM_STR);
            $stmt->bindParam(':fecha', $fecha, PDO::PARAM_STR);
            $stmt->bindParam(':segundos', $segundos, PDO::PARAM_INT);
            $stmt->execute();
        }
    }

    $idPartidaNueva = (int)$pdo->lastInsertId();
    echo json_encode([
        'success'    => true,
        'pin'        => $pinPartida,
        'id_partida' => $idPartidaNueva,
        'modo_juego' => $modo,
    ]);
} catch (Throwable $th) {
    error_log('Error generando PIN: ' . $th->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al generar PIN']);
} finally {
    $mysql->desconectar();
}
