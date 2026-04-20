<?php
require_once '../../includes/auth.php';
if (empty($_SESSION['pinPartida'])) {
    header('Location: ' . _auth_index_url() . '?error=true&message=' . urlencode('No puedes acceder a esta página, ingresa un pin antes de continuar!') . '&title=' . urlencode('Acceso denegado'));
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php csrf_meta(); ?>
    <title>Tu nombre — ¿Y esa pregunta?</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="../css/styles.css" rel="stylesheet" />
    <link rel="stylesheet" href="../css/player-register.css">
</head>

<body class="player-reg-page">
    <div class="pr-decor" aria-hidden="true"></div>

    <header class="pr-header">
        <a href="../../index.php" class="pr-back">← Volver al inicio</a>
    </header>

    <main class="pr-main">
        <div class="pr-inner">
            <img class="pr-logo" src="../assets/img/logo.png" alt="¿Y esa Pregunta?">

            <section class="pr-card" aria-labelledby="pr-title">
                <h1 id="pr-title" class="pr-title">Datos del jugador</h1>
                <p class="pr-sub">
                    Escribe tu <strong>nombre</strong> y N° de <strong>ficha</strong> (número o código corto)
                    para distinguirte en la partida.
                </p>

                <form id="frmEntrarPartida">
                    <div class="pr-field">
                        <label class="pr-label" for="nombre">Nombre en pantalla</label>
                        <input
                            type="text"
                            class="pr-input"
                            id="nombre"
                            name="nombre"
                            placeholder="Ej. María, Team Azul…"
                            maxlength="40"
                            autocomplete="nickname"
                            required
                        />
                    </div>

                    <div class="pr-field">
                        <label class="pr-label" for="ficha">Ficha</label>
                        <input
                            type="text"
                            class="pr-input"
                            id="ficha"
                            name="ficha"
                            placeholder="Ej. 12, 305, A1…"
                            maxlength="40"
                            autocomplete="off"
                            required
                        />
                       
                    </div>

                    <div class="pr-actions">
                        <button type="button" class="pr-btn-primary btnEntrarPartida">Entrar al lobby</button>
                        <a href="../../index.php" class="pr-btn-secondary">Cancelar</a>
                    </div>
                </form>
            </section>
        </div>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../js/general/csrf.js"></script>
    <script type="module" src="../js/partidas/partidasUsuario.js"></script>
</body>

</html>
