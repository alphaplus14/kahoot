/**
 * Espera a que la partida pase a estado "Jugando" (organizador pulsa Iniciar juego).
 */
const INTERVALO_MS = 2000;

async function consultarEstado() {
    try {
        const res = await fetch('../../controller/partidas/controllerEstadoPartidaJugador.php', {
            credentials: 'same-origin',
        });
        const data = await res.json();

        if (data.expulsado) {
            await Swal.fire({
                title: 'Fuiste quitado del lobby',
                text: data.message || 'El organizador te ha expulsado. Elige un nombre apropiado e ingresa de nuevo.',
                icon: 'warning',
                confirmButtonColor: '#2563eb',
            });
            window.location.href = '../../index.php';
            return;
        }

        if (!data.success) {
            window.location.href = '../../index.php';
            return;
        }

        const el = document.getElementById('estadoLobbyTexto');
        if (el) {
            el.classList.remove('pl-status--ready');
            if (data.estado === 'Esperando') {
                el.textContent = 'Esperando a que el organizador inicie…';
            } else if (data.estado === 'Jugando') {
                el.textContent = '¡Empezamos! Cargando el juego…';
                el.classList.add('pl-status--ready');
            }
        }

        if (data.estado === 'Jugando') {
            window.location.href = 'juego.php';
            return;
        }
        if (data.estado === 'Finalizada') {
            await Swal.fire({
                title: 'Partida finalizada',
                text: 'El organizador cerró la partida.',
                icon: 'info',
                confirmButtonColor: '#2563eb',
            });
            window.location.href = '../../index.php';
        }
    } catch (e) {
        console.debug('lobby poll:', e);
    }
}

consultarEstado();
setInterval(consultarEstado, INTERVALO_MS);

const btnSalirLobby = document.getElementById('btnSalirLobby');
if (btnSalirLobby) {
    btnSalirLobby.addEventListener('click', async () => {
        const ok = await Swal.fire({
            title: '¿Salir de la sala?',
            text: 'Puedes volver a entrar con el PIN si la partida sigue en espera.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#2563eb',
        });
        if (!ok.isConfirmed) return;
        try {
            const fd = new FormData();
            const res = await csrfFetch('../../controller/jugadores/controllerSalirLobbyJugador.php', {
                method: 'POST',
                body: fd,
            });
            const data = await res.json();
            if (!data.success) {
                await Swal.fire({
                    title: 'No se pudo salir',
                    text: data.message || 'Intenta de nuevo.',
                    icon: 'error',
                    confirmButtonColor: '#2563eb',
                });
                return;
            }
            window.location.href = '../../index.php';
        } catch (e) {
            console.error(e);
            await Swal.fire({
                title: 'Error de red',
                text: 'Comprueba tu conexión e intenta otra vez.',
                icon: 'error',
                confirmButtonColor: '#2563eb',
            });
        }
    });
}
