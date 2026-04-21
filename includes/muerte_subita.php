<?php

/**
 * Finalistas objetivo en muerte súbita (ranking del organizador al cerrar el cuestionario).
 */
function kahoot_muerte_subita_finalistas(): int
{
    return 5;
}

/**
 * Cuenta cuántos hitos de eliminación quedan después de este índice (excluye el fin del cuestionario).
 *
 * @param int $nuevoIndiceTrasRespuesta Próxima pregunta a mostrar (0-based), p. ej. tras responder Q#9 → 10.
 * @param int $totalPreguntas          Cantidad total de preguntas en la partida
 * @param int $intervalo               Cada cuántas preguntas hay eliminación (5 o 10)
 */
function kahoot_muerte_checkpoints_restantes(int $nuevoIndiceTrasRespuesta, int $totalPreguntas, int $intervalo): int
{
    if ($intervalo < 1 || $totalPreguntas < 1) {
        return 1;
    }
    $n = 0;
    for ($mark = $intervalo; $mark < $totalPreguntas; $mark += $intervalo) {
        if ($mark > $nuevoIndiceTrasRespuesta) {
            $n++;
        }
    }

    return max(1, $n);
}

/**
 * Elimina peor puntuación hasta acercarse a N finalistas. Devuelve cuántos jugadores quedaron eliminados en esta ronda.
 */
function kahoot_muerte_aplicar_eliminacion(
    PDO $pdo,
    int $idPartida,
    int $nuevoIndiceTrasRespuesta,
    int $totalPreguntas,
    int $intervalo
): int {
    $finalistas = kahoot_muerte_subita_finalistas();

    $sel = $pdo->prepare(
        'SELECT id_jugador, puntaje_jugador FROM jugadores
         WHERE partidas_id_partida = :pid AND COALESCE(en_juego, 1) = 1
         ORDER BY puntaje_jugador ASC, id_jugador ASC'
    );
    $sel->bindValue(':pid', $idPartida, PDO::PARAM_INT);
    $sel->execute();
    $filas = $sel->fetchAll(PDO::FETCH_ASSOC);
    $activos = count($filas);
    if ($activos <= $finalistas) {
        return 0;
    }

    $checkpoints = kahoot_muerte_checkpoints_restantes($nuevoIndiceTrasRespuesta, $totalPreguntas, $intervalo);
    $necesarios = $activos - $finalistas;
    $porRonda     = (int)ceil($necesarios / max(1, $checkpoints));
    $porRonda     = min($porRonda, $necesarios);

    if ($porRonda < 1) {
        return 0;
    }

    $idsPeor = array_slice(array_column($filas, 'id_jugador'), 0, $porRonda);
    if ($idsPeor === []) {
        return 0;
    }

    $upd = $pdo->prepare('UPDATE jugadores SET en_juego = 0 WHERE id_jugador = :id LIMIT 1');
    foreach ($idsPeor as $jid) {
        $upd->bindValue(':id', (int)$jid, PDO::PARAM_INT);
        $upd->execute();
    }

    return count($idsPeor);
}
