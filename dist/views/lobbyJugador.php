<?php
require_once '../../includes/auth.php';
if (empty($_SESSION['id_jugador']) || empty($_SESSION['idPartida'])) {
    header('Location: ' . _auth_index_url() . '?error=true&message=' . urlencode('Entra con un PIN válido para acceder al lobby.') . '&title=' . urlencode('Acceso denegado'));
    exit;
}
$nombreMostrar = htmlspecialchars($_SESSION['nombreJugador'] ?? 'Jugador', ENT_QUOTES, 'UTF-8');
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <?php favicon_link(); ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sala de espera — ¿Y esa pregunta?</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="../css/styles.css" rel="stylesheet" />
    <link rel="stylesheet" href="../css/player-lobby.css">
</head>

<body class="player-lobby-page">
    <div class="pl-decor" aria-hidden="true"></div>

    <main class="pl-main">
        <div class="pl-inner">
            <img class="pl-logo" src="../assets/img/logo.png" alt="¿Y esa Pregunta?">

            <section class="pl-card" aria-labelledby="nombreJugadorLobby">
                <p class="pl-eyebrow">Sala de espera</p>
                <h1 class="pl-name" id="nombreJugadorLobby"><?php echo $nombreMostrar; ?></h1>
                <p class="pl-copy">
                    Estás en el lobby. Cuando el organizador pulse <strong>Iniciar juego</strong> en su pantalla,
                    pasarás automáticamente al cuestionario.
                </p>

                <div class="pl-wait" aria-hidden="true">
                    <div class="pl-dots" title="Esperando">
                        <span></span><span></span><span></span>
                    </div>
                </div>

                <p class="pl-status" id="estadoLobbyTexto">Esperando al organizador…</p>

                <a href="../../index.php" class="pl-btn-out">Salir de la sala</a>
            </section>
        </div>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../js/partidas/lobbyJugador.js"></script>
</body>

</html>
