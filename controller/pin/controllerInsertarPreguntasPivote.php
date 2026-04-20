<?php
require_once __DIR__ . '/../../includes/auth.php';
header('Content-Type: application/json');
requireActiveUserJson();
csrf_validate();

require_once __DIR__ . '/../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();

$categoriaJuego   = filter_input(INPUT_POST, 'categoria', FILTER_VALIDATE_INT, ['options' => ['min_range' => 0]]);
$limitePreguntas  = filter_input(INPUT_POST, 'limitePreguntas', FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 100]]);
$pinPartida       = filter_input(INPUT_POST, 'pin', FILTER_VALIDATE_INT, ['options' => ['min_range' => 100000, 'max_range' => 999999]]);

if (in_array(false, [$categoriaJuego, $limitePreguntas, $pinPartida], true) || in_array(null, [$categoriaJuego, $limitePreguntas, $pinPartida], true)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Parámetros inválidos']);
    exit;
}

try {
    // Traer id de la partida
    $stmt = $mysql->getConexion()->prepare('SELECT id_partida FROM partidas WHERE pin_partida = :pin_partida');
    $stmt->bindParam(':pin_partida', $pinPartida, PDO::PARAM_INT);
    $stmt->execute();
    $partida = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$partida) {
        http_response_code(404);
        echo json_encode(['success' => false, 'message' => 'Partida no encontrada']);
        exit;
    }
    $idPartida = (int)$partida['id_partida'];

    // Traer preguntas. Usamos ORDER BY RAND() LIMIT :n para dejar la
    // aleatorización y el tope en la BD (más eficiente que en PHP).
    if ($categoriaJuego === 0) {
        $sqlPreguntas = 'SELECT id_cuestionario FROM cuestionario
                         WHERE estado_cuestionario = "Activo"
                         ORDER BY RAND() LIMIT :lim';
        $stmt = $mysql->getConexion()->prepare($sqlPreguntas);
    } else {
        $sqlPreguntas = 'SELECT id_cuestionario FROM cuestionario
                         WHERE categorias_id_categoria = :categoria
                           AND estado_cuestionario = "Activo"
                         ORDER BY RAND() LIMIT :lim';
        $stmt = $mysql->getConexion()->prepare($sqlPreguntas);
        $stmt->bindValue(':categoria', $categoriaJuego, PDO::PARAM_INT);
    }
    $stmt->bindValue(':lim', $limitePreguntas, PDO::PARAM_INT);
    $stmt->execute();
    $preguntas = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (count($preguntas) === 0) {
        http_response_code(409);
        echo json_encode(['success' => false, 'message' => 'No hay preguntas disponibles para esa categoría']);
        exit;
    }

    // Insertar en la tabla pivote
    $sqlInsert = 'INSERT INTO quiz (cuestionario_id_cuestionario, partidas_id_partida) VALUES (:pregunta, :partida)';
    $stmtInsert = $mysql->getConexion()->prepare($sqlInsert);
    foreach ($preguntas as $p) {
        $stmtInsert->bindValue(':pregunta', (int)$p['id_cuestionario'], PDO::PARAM_INT);
        $stmtInsert->bindValue(':partida',  $idPartida,                 PDO::PARAM_INT);
        $stmtInsert->execute();
    }

    echo json_encode(['success' => true, 'message' => 'Juego creado exitosamente!']);
} catch (Throwable $th) {
    error_log('Error insertar preguntas pivote: ' . $th->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error al preparar las preguntas de la partida']);
} finally {
    $mysql->desconectar();
}
