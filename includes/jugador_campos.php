<?php
/**
 * Normaliza nombre/ficha de jugador: UTF-8 completo (ñ, tildes, símbolos, emojis).
 * Almacenamiento con PDO preparado (sin riesgo SQLi). La BD debe usar utf8mb4 en tablas.
 * Solo se eliminan caracteres de control (incl. NUL). El límite cuenta grafemas si hay intl.
 */
function jugador_utf8_len(string $s): int
{
    if (function_exists('grapheme_strlen')) {
        $n = grapheme_strlen($s);
        if ($n !== false) {
            return (int) $n;
        }
    }

    return mb_strlen($s, 'UTF-8');
}

function jugador_utf8_substr(string $s, int $start, int $length): string
{
    if (function_exists('grapheme_substr') && $length > 0) {
        $out = grapheme_substr($s, $start, $length);
        if (is_string($out)) {
            return $out;
        }
    }

    return mb_substr($s, $start, $length, 'UTF-8');
}

function jugador_normalizar_campo(string $raw, int $maxLen, int $minLen): ?string
{
    $s = trim($raw);
    if ($s === '') {
        return null;
    }
    $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $s);
    if (jugador_utf8_len($s) > $maxLen) {
        $s = jugador_utf8_substr($s, 0, $maxLen);
    }
    $s = trim($s);
    if (jugador_utf8_len($s) < $minLen) {
        return null;
    }

    return $s;
}
