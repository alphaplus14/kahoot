<?php
require_once __DIR__ . '/includes/auth.php';
$hasError = !empty($_GET['error']);
$message  = $hasError ? (string)($_GET['message'] ?? '') : '';
$title    = $hasError ? (string)($_GET['title']   ?? '') : '';
?>


<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <?php favicon_link(); ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php csrf_meta(); ?>
    <title>¿Y esa pregunta? — Unirse a partida</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="dist/css/styles.css" rel="stylesheet" />
    <link rel="stylesheet" href="dist/css/index-home.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">
</head>

<body class="idx-page">
    <?php if ($hasError) { ?>
        <button class="visually-hidden" id="alertasErrores"
            data-message="<?php echo htmlspecialchars($message, ENT_QUOTES, 'UTF-8'); ?>"
            data-title="<?php echo htmlspecialchars($title, ENT_QUOTES, 'UTF-8'); ?>"></button>
    <?php } ?>

    <div class="idx-decor" aria-hidden="true"></div>

    <header class="idx-header">
        <a href="dist/views/login.php" class="idx-btn-login">Iniciar sesión</a>
    </header>

    <main class="idx-main">
        <div class="idx-inner">
            <section class="idx-hero" aria-labelledby="idx-hero-title">
                <img class="idx-hero__logo" src="dist/assets/img/logo.png" alt="¿Y esa Pregunta?">
                <h1 id="idx-hero-title" class="idx-hero__title">Únete con el PIN de la partida</h1>
            </section>

            <section class="idx-card" aria-labelledby="idx-card-label">
                <span id="idx-card-label" class="idx-card__eyebrow">PIN de partida</span>
                <form action="dist/views/procesar_pin.php" method="post" id="formPin">
                    <label for="pinIngresado" class="visually-hidden">PIN de 6 dígitos</label>
                    <input
                        class="idx-pin-input"
                        id="pinIngresado"
                        type="text"
                        inputmode="numeric"
                        pattern="\d{6}"
                        maxlength="6"
                        placeholder="••••••"
                        name="pinIngresado"
                        autocomplete="one-time-code"
                        required
                    />
                    <button type="button" id="ingresar" class="idx-btn-submit">Ingresar</button>
                </form>
            </section>
        </div>
    </main>

    <footer id="nopin" class="position-fixed bottom-0 w-100"></footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="dist/js/general/csrf.js"></script>
    <script src="dist/js/login/login.js"></script>
    <script src="dist/js/lobby/lobby.js"></script>

</body>

</html>
