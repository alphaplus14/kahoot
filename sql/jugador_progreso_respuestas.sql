-- Progreso por jugador para el panel del organizador (respuestas en vivo).
-- Ejecutar una vez en la base de datos del proyecto.

ALTER TABLE jugadores
    ADD COLUMN preguntas_respondidas SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    ADD COLUMN ultima_pregunta_indice SMALLINT UNSIGNED NULL DEFAULT NULL COMMENT 'Índice 0-based de la última pregunta contestada',
    ADD COLUMN ultima_respuesta_letra VARCHAR(8) NULL DEFAULT NULL COMMENT 'A-D o cadena vacía si tiempo agotado';
