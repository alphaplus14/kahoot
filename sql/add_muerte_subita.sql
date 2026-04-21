-- Muerte súbita: modo en partidas y seguimiento de jugadores activos.
-- Ejecutar una vez en la base de datos del proyecto.

ALTER TABLE partidas
    ADD COLUMN modo_juego VARCHAR(24) NOT NULL DEFAULT 'normal'
        COMMENT 'normal | muerte_subita',
    ADD COLUMN intervalo_eliminacion TINYINT UNSIGNED NULL DEFAULT NULL
        COMMENT 'Preguntas entre eliminaciones (5 o 10); solo muerte_subita';

ALTER TABLE jugadores
    ADD COLUMN en_juego TINYINT(1) NOT NULL DEFAULT 1
        COMMENT '1=en carrera (MS), 0=eliminado';
