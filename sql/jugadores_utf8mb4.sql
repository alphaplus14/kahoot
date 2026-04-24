-- Si los emojis se guardan como "?" o no se ven, la tabla/columnas deben ser utf8mb4.
-- Ejecutar una vez en la base de datos del proyecto (phpMyAdmin o mysql CLI).

ALTER TABLE jugadores
    CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
