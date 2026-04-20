<?php
require_once '../../includes/auth.php';
$hasError = !empty($_GET['error']);
$message  = $hasError ? (string)($_GET['message'] ?? '') : '';
$title    = $hasError ? (string)($_GET['title']   ?? '') : '';
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <?php csrf_meta(); ?>
    <title>Inicio de sesión — ¿Y esa Pregunta?</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="../css/styles.css" rel="stylesheet" />
    <link href="../css/login-view.css" rel="stylesheet" />
</head>

<body class="login-page">
    <?php if ($hasError) { ?>
        <button class="visually-hidden" id="alertasErrores"
            data-message="<?php echo htmlspecialchars($message, ENT_QUOTES, 'UTF-8'); ?>"
            data-title="<?php echo htmlspecialchars($title, ENT_QUOTES, 'UTF-8'); ?>"></button>
    <?php } ?>

    <div class="login-decor" aria-hidden="true"></div>

    <header class="login-header">
        <a href="../../index.php" class="login-back">← Volver al inicio</a>
    </header>

    <main class="login-main">
        <div class="login-inner">
            <section class="login-hero" aria-labelledby="login-title">
                <img class="login-hero__logo" src="../assets/img/logo.png" alt="¿Y esa Pregunta?">
                <h1 id="login-title" class="login-hero__title">Inicio de sesión</h1>
                <p class="login-hero__subtitle">Acceso para organizadores</p>
            </section>

            <section class="login-card" aria-labelledby="login-form-label">
                <span id="login-form-label" class="login-card__eyebrow">Credenciales</span>
                <form action="../../controller/controllerLogin.php" method="post">
                    <?php csrf_field(); ?>
                    <div class="login-field">
                        <label class="login-label" for="correoLogin">Email</label>
                        <input
                            class="login-input"
                            id="correoLogin"
                            type="email"
                            name="correoLogin"
                            placeholder="correo@ejemplo.com"
                            autocomplete="email"
                            inputmode="email"
                            required
                        />
                    </div>
                    <div class="login-field">
                        <label class="login-label" for="passLogin">Contraseña</label>
                        <input
                            class="login-input"
                            id="passLogin"
                            type="password"
                            name="passLogin"
                            placeholder="••••••••"
                            autocomplete="current-password"
                            required
                        />
                    </div>
                    <div class="login-actions">
                        <button type="submit" class="login-btn-primary">Ingresar</button>
                        <a href="../../index.php" class="login-btn-secondary">Cancelar</a>
                    </div>
                </form>
            </section>
        </div>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script src="../js/general/csrf.js"></script>
    <script src="../js/scripts.js"></script>
    <script src="../js/login/login.js"></script>
</body>

</html>
