<?php
require_once '../../includes/auth.php';
requireActiveUser();
require_once '../../models/MySQL.php';
$mysql = new MySQL();
$mysql->conectar();
?>

<!DOCTYPE html>
<html lang="es" class="pin-lobby-root">

<head>
    <meta charset="UTF-8">
    <?php favicon_link(); ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php csrf_meta(); ?>
    <?php csrf_inline_script(); ?>
    <title>Pin - ¿Y esa pregunta?</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="../css/styles.css" rel="stylesheet" />
    <link rel="stylesheet" href="../css/pin.css">
</head>

<body class="pin-lobby-page">
    <div class="pin-lobby-decor" aria-hidden="true"></div>

    <header class="pin-header">
        <div class="pin-header__bar">
            <div class="pin-header__left">
                <button id="btnVolver" type="button" class="pin-btn pin-btn--ghost">
                    <span class="pin-btn__icon" aria-hidden="true">←</span> Volver
                </button>
            </div>
            <div class="pin-header__center">
                <span id="estadoPartidaBadge" class="pin-badge pin-badge--waiting">Lobby</span>
                <div id="cronometro" class="pin-timer" role="timer" aria-live="polite">45:00</div>
            </div>
            <div class="pin-header__right">
                <button id="btnIniciarJuego" type="button" class="pin-btn pin-btn--success">
                    Iniciar juego
                </button>
                <button id="terminarJuego" type="button" class="pin-btn pin-btn--danger" data-id="">
                    Terminar partida
                </button>
            </div>
        </div>
    </header>

    <main class="pin-main">
        <div class="pin-main__inner">
            <section class="pin-hero pin-hero--enter" aria-labelledby="pin-hero-title">
                <img class="pin-hero__logo" src="../assets/img/logo.png" alt="¿Y esa Pregunta?">
                <h1 id="pin-hero-title" class="pin-hero__title">
                    Comparte el PIN con los jugadores
                </h1>
                <p class="pin-hero__subtitle">
                    Podrán unirse desde la pantalla principal. Cuando esten listos, inicia el juego.
                </p>
            </section>

            <div class="pin-cards-grid">
                <section class="pin-card pin-card--pin" aria-labelledby="pin-label">
                    <span id="pin-label" class="pin-card__eyebrow">Game PIN</span>
                    <p id="pin-display" class="pin-display-num">Cargando…</p>
                </section>

                <section class="pin-card pin-card--roster" aria-labelledby="roster-title">
                    <div class="pin-card__head">
                        <h2 id="roster-title" class="pin-card__title">Jugadores en el lobby</h2>
                        <span id="contadorJugadores" class="pin-count" title="Jugadores conectados">0</span>
                    </div>
                    <ul id="listaJugadores" class="pin-player-list">
                        <li class="pin-player-empty" id="mensajeSinJugadores">
                            Esperando a que se unan jugadores…
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../js/general/csrf.js"></script>
    <script src="../js/mostrarPin/mostrarPin.js"></script>
</body>

</html>
