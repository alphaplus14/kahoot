// Obtener PIN desde sessionStorage
const pin = sessionStorage.getItem('pinGenerado');

if (pin) {
    // parseo el pin para que no reciba el elemento de storage
    let pinFormateado = String(pin);

    // insertar espacio para el front que se vea mas legible
    if (pinFormateado.length > 3) {
        pinFormateado = pinFormateado.substring(0, 3) + ' ' + pinFormateado.substring(3);
    }

    document.querySelector('#pin-display').textContent = pinFormateado;
} else {
    // Si no hay PIN, redirigir o mostrar error
    document.querySelector('#pin-display').textContent = 'Error: PIN no encontrado';

    setTimeout(() => {
        window.location.href = 'generarPIN.php';
    }, 2000);
}
// Tiempo maximo que el pin va a estar habilitado para actualizar el estado del juego
const TIEMPO_LIMITE = 45 * 60 * 1000;

// Obtener tiempo con session storage
let tiempoInicio = sessionStorage.getItem('tiempoInicio');
const pinAlmacenado = sessionStorage.getItem('pinAlmacenadoParaTiempo');

if (!tiempoInicio || pinAlmacenado !== pin) {
    tiempoInicio = Date.now();
    sessionStorage.setItem('tiempoInicio', tiempoInicio);
    sessionStorage.setItem('pinAlmacenadoParaTiempo', pin);
} else {
    tiempoInicio = Number(tiempoInicio);
}

function limpiarSessionStorage() {
    sessionStorage.removeItem('tiempoInicio');
    sessionStorage.removeItem('pinGenerado');
    sessionStorage.removeItem('idPartidaOrganizador');
    sessionStorage.removeItem('pinAlmacenadoParaTiempo');
}

function postTerminarPartida(pinValor) {
    const params = new URLSearchParams();
    params.set('pin', String(pinValor));
    return fetch('../../controller/partidas/controllerTerminarPartida.php', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
    });
}

async function finalizarPinAnterior(pinAnterior) {
    if (!pinAnterior) return;

    try {
        await postTerminarPartida(pinAnterior);

        console.log('PIN anterior finalizado:', pinAnterior);
    } catch (error) {
        console.error('Error al finalizar PIN anterior:', error);
    }
}

function notificarActualizacionHistorial() {
    try {
        //condicion para verificar que se abrion la ventana y no se ha cerrado para mandar un mensaje y comunicarse a otra pestaña
        if (window.opener && !window.opener.closed) {
            window.opener.postMessage({ type: 'actualizarHistorial' }, '*');
        }

        //manda la señal al evento storage en historialPartida.js para que detecte el cambio
        localStorage.setItem('actualizarHistorial', Date.now().toString());

        //limpiar el local storage para que no se llene de datos
        setTimeout(() => {
            localStorage.removeItem('actualizarHistorial');
        }, 1000);
    } catch (error) {
        console.log('No se pudo notificar la actualización:', error);
    }
}

function terminarAutomatico() {
    postTerminarPartida(pin)
        .then((res) => res.json())
        .then((data) => {
            limpiarSessionStorage();
            Swal.fire({
                title: 'Tiempo terminado',
                text: 'La partida ha sido finalizada automáticamente.',
                icon: 'info',
                confirmButtonColor: '#007bff',
            }).then(() => {
                window.location.href = `../views/generarPIN.php`;
            });
        });
}

function actualizarTimer() {
    const ahora = Date.now();
    const tiempoPasado = ahora - tiempoInicio;
    const tiempoRestante = TIEMPO_LIMITE - tiempoPasado;

    if (tiempoRestante <= 0) {
        terminarAutomatico();
        return;
    }

    // Mostrar cuenta regresiva
    const minutos = Math.floor(tiempoRestante / 60000);
    const segundos = Math.floor((tiempoRestante % 60000) / 1000);

    document.querySelector('#cronometro').textContent = `${minutos}:${segundos.toString().padStart(2, '0')}`;
}

// Actualiza cada segundo el timer
setInterval(actualizarTimer, 1000);
actualizarTimer();

// #region Polling de jugadores conectados
// El organizador ve, en tiempo casi real, los jugadores que se van uniendo
// a la partida. Se consulta al backend cada 3 s; si la pestaña está oculta
// se salta la consulta para no gastar ancho de banda.

const listaJugadores = document.querySelector('#listaJugadores');
const contadorJugadores = document.querySelector('#contadorJugadores');

/** Estado actual de la partida (solo lobby permite expulsar). */
let estadoLobbyActual = 'Esperando';

/** Total de preguntas del cuestionario (solo en partida Jugando; para 13/40 en la lista). */
let totalPreguntasCuestionario = 0;

/**
 * Lista de jugadores: DOM + textContent (no innerHTML en nombres) para que emojis y UTF-8 se vean bien.
 */
function renderJugadores(jugadores) {
    if (!listaJugadores) return;

    const total = Array.isArray(jugadores) ? jugadores.length : 0;
    if (contadorJugadores) contadorJugadores.textContent = String(total);

    listaJugadores.replaceChildren();

    if (total === 0) {
        const vacio = document.createElement('li');
        vacio.id = 'mensajeSinJugadores';
        vacio.className = 'pin-player-empty';
        vacio.textContent = 'Esperando a que se unan jugadores…';
        listaJugadores.appendChild(vacio);
        return;
    }

    const puedeExpulsar = estadoLobbyActual === 'Esperando';
    const idOrg = sessionStorage.getItem('idPartidaOrganizador');

    jugadores.forEach((j, i) => {
        const li = document.createElement('li');
        li.className = 'pin-player-row' + (i === 0 ? ' pin-player-row--first' : '');

        const rank = document.createElement('span');
        rank.className = 'pin-player__rank';
        rank.title = 'Posición';
        rank.textContent = '#' + (i + 1);

        const nameblock = document.createElement('div');
        nameblock.className = 'pin-player__nameblock';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'pin-player__name';
        const nombreRaw = j.nombre_jugador;
        nameSpan.textContent = nombreRaw == null ? '' : String(nombreRaw);

        nameblock.appendChild(nameSpan);

        const fichaRaw = j.ficha_jugador;
        if (fichaRaw != null && String(fichaRaw).trim() !== '') {
            const meta = document.createElement('span');
            meta.className = 'pin-player__meta';
            meta.textContent = 'Ficha · ' + String(fichaRaw);
            nameblock.appendChild(meta);
        }

        if (estadoLobbyActual === 'Jugando' && totalPreguntasCuestionario > 0) {
            const prR = j.preguntas_respondidas;
            const prN =
                prR !== undefined && prR !== null && prR !== '' ? parseInt(String(prR), 10) : 0;
            const prOk = Number.isFinite(prN) ? prN : 0;
            const prog = document.createElement('span');
            prog.className = 'pin-player__progreso';
            prog.textContent = 'Respondidas: ' + prOk + '/' + totalPreguntasCuestionario;
            nameblock.appendChild(prog);
        }

        const scoreWrap = document.createElement('div');
        scoreWrap.className = 'pin-player__score';

        const ptsRaw = j.puntaje_jugador;
        const pts = ptsRaw !== undefined && ptsRaw !== null && ptsRaw !== '' ? Number(ptsRaw) : 0;
        const scoreVal = document.createElement('span');
        scoreVal.className = 'pin-player__score-val';
        scoreVal.textContent = Number.isFinite(pts) ? String(pts) : '0';

        const scoreLbl = document.createElement('span');
        scoreLbl.className = 'pin-player__score-lbl';
        scoreLbl.textContent = 'pts';

        scoreWrap.appendChild(scoreVal);
        scoreWrap.appendChild(scoreLbl);

        const actions = document.createElement('div');
        actions.className = 'pin-player__actions';
        if (puedeExpulsar && (idOrg || pin)) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'pin-btn pin-btn--outline-danger';
            btn.setAttribute('data-action', 'expulsar');
            const jid = Number(j.id_jugador);
            btn.setAttribute('data-id-jugador', Number.isFinite(jid) ? String(jid) : '0');
            btn.textContent = 'Quitar';
            actions.appendChild(btn);
        }

        li.appendChild(rank);
        li.appendChild(nameblock);
        li.appendChild(scoreWrap);
        li.appendChild(actions);
        listaJugadores.appendChild(li);
    });
}

function actualizarUIEstado(estado) {
    const badge = document.getElementById('estadoPartidaBadge');
    const btnIniciar = document.getElementById('btnIniciarJuego');
    if (!badge) return;
    const e = estado || 'Esperando';
    if (e === 'Esperando') {
        badge.className = 'pin-badge pin-badge--waiting';
        badge.textContent = 'Lobby';
        if (btnIniciar) btnIniciar.disabled = false;
    } else if (e === 'Jugando') {
        badge.className = 'pin-badge pin-badge--live';
        badge.textContent = 'En curso';
        if (btnIniciar) btnIniciar.disabled = true;
    } else {
        badge.className = 'pin-badge pin-badge--misc';
        badge.textContent = e;
        if (btnIniciar) btnIniciar.disabled = true;
    }
}

const POLL_JUGADORES_LOBBY_MS = 3000;
const POLL_JUGADORES_JUEGO_MS = 2000;

let pollJugadoresTimer = null;

function programarPollJugadores() {
    if (pollJugadoresTimer) {
        clearInterval(pollJugadoresTimer);
    }
    const ms = estadoLobbyActual === 'Jugando' ? POLL_JUGADORES_JUEGO_MS : POLL_JUGADORES_LOBBY_MS;
    pollJugadoresTimer = setInterval(refrescarJugadores, ms);
}

async function refrescarJugadores() {
    if (!pin) return;
    if (document.hidden) return;

    try {
        const idOrg = sessionStorage.getItem('idPartidaOrganizador');
        const url =
            idOrg && idOrg.length > 0
                ? `../../controller/partidas/controllerDatosJugadoresPorPin.php?id_partida=${encodeURIComponent(idOrg)}`
                : `../../controller/partidas/controllerDatosJugadoresPorPin.php?pin=${encodeURIComponent(pin)}`;
        const resp = await fetch(url, { credentials: 'same-origin' });
        if (!resp.ok) {
            const errTxt = await resp.text().catch(() => '');
            console.debug('controllerDatosJugadoresPorPin HTTP', resp.status, errTxt);
            return;
        }
        const data = await resp.json();
        if (data && data.success) {
            if (typeof data.total_preguntas === 'number' && data.total_preguntas >= 0) {
                totalPreguntasCuestionario = data.total_preguntas;
            }
            if (data.estado) {
                const cambio = data.estado !== estadoLobbyActual;
                estadoLobbyActual = data.estado;
                actualizarUIEstado(data.estado);
                if (cambio) {
                    programarPollJugadores();
                }
            }
            if (data.estado !== 'Jugando') {
                totalPreguntasCuestionario = 0;
            }
            renderJugadores(data.jugadores || []);
        }
    } catch (err) {
        // No ruidamos al usuario: es un polling. Se reintentará al siguiente ciclo.
        console.debug('refrescarJugadores:', err);
    }
}

refrescarJugadores();
programarPollJugadores();
window.addEventListener('beforeunload', () => clearInterval(pollJugadoresTimer));

if (listaJugadores) {
    listaJugadores.addEventListener('click', async (ev) => {
        const t = ev.target;
        if (!(t instanceof HTMLElement)) return;
        const btn = t.closest('[data-action="expulsar"]');
        if (!btn) return;
        const idStr = btn.getAttribute('data-id-jugador');
        const idJugador = idStr ? parseInt(idStr, 10) : NaN;
        if (!Number.isFinite(idJugador) || idJugador < 1) return;

        const confirmar = await Swal.fire({
            title: '¿Quitar a este jugador?',
            text: 'Volverá a la pantalla inicial para elegir otro nombre.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, quitar',
            cancelButtonText: 'Cancelar',
        });
        if (!confirmar.isConfirmed) return;

        const fd = new FormData();
        fd.append('id_jugador', String(idJugador));
        const idOrgEv = sessionStorage.getItem('idPartidaOrganizador');
        if (idOrgEv) fd.append('id_partida', idOrgEv);
        if (pin) fd.append('pin', String(pin));

        try {
            const res = await csrfFetch('../../controller/jugadores/controllerExpulsarJugador.php', {
                method: 'POST',
                body: fd,
            });
            const data = await res.json();
            if (data.success) {
                await Swal.fire({
                    title: 'Listo',
                    text: data.message || 'Jugador quitado del lobby.',
                    icon: 'success',
                    confirmButtonColor: '#007bff',
                    timer: 1800,
                    showConfirmButton: true,
                });
                refrescarJugadores();
            } else {
                Swal.fire({
                    title: 'No se pudo quitar',
                    text: data.message || 'Intenta de nuevo.',
                    icon: 'error',
                    confirmButtonColor: '#007bff',
                });
            }
        } catch (err) {
            console.error(err);
            Swal.fire({ title: 'Error de red', icon: 'error', confirmButtonColor: '#007bff' });
        }
    });
}
// #endregion

const btnIniciarJuego = document.getElementById('btnIniciarJuego');
if (btnIniciarJuego && pin) {
    btnIniciarJuego.addEventListener('click', async () => {
        const confirmar = await Swal.fire({
            title: '¿Iniciar el juego?',
            html: 'Los jugadores pasarán de la sala de espera al cuestionario. Podrás seguir viendo el PIN hasta que termines la partida.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#198754',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, iniciar',
            cancelButtonText: 'Cancelar',
        });
        if (!confirmar.isConfirmed) return;

        const formData = new FormData();
        formData.append('pin', pin);
        try {
            const res = await csrfFetch('../../controller/partidas/controllerIniciarPartida.php', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                await Swal.fire({
                    title: 'Listo',
                    text: data.message || 'Partida iniciada.',
                    icon: 'success',
                    confirmButtonColor: '#007bff',
                });
                refrescarJugadores();
            } else {
                Swal.fire({
                    title: 'No se pudo iniciar',
                    text: data.message || 'Intenta de nuevo.',
                    icon: 'error',
                    confirmButtonColor: '#007bff',
                });
            }
        } catch (err) {
            console.error(err);
            Swal.fire({ title: 'Error de red', icon: 'error', confirmButtonColor: '#007bff' });
        }
    });
}

const btnVolver = document.querySelector('#btnVolver');

if (btnVolver) {
    btnVolver.addEventListener('click', async () => {
        const resultado = await Swal.fire({
            title: '¿Salir del juego?',
            text: 'El juego actual será finalizado. ¿Deseas continuar?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#007bff',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, volver',
            cancelButtonText: 'Cancelar',
        });

        if (resultado.isConfirmed) {
            await finalizarPinAnterior(pin);
            limpiarSessionStorage();
            notificarActualizacionHistorial();
            window.location.href = 'generarPIN.php';
        }
    });
}
const btnTerminar = document.querySelector('#terminarJuego');

if (btnTerminar) {
    btnTerminar.dataset.id = pin;
    btnTerminar.addEventListener('click', async () => {
        const resultado = await Swal.fire({
            title: '¿Estas seguro?',
            text: '¿Deseas terminar el juego? Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#007bff',
            cancelButtonColor: '#7d6c6cff',
            confirmButtonText: 'Sí, terminar',
            cancelButtonText: 'Cancelar',
        });

        if (!resultado.isConfirmed) {
            return;
        }

        const dataPin = btnTerminar.dataset.id;
        console.log('PIN enviado:', dataPin);

        const res = await postTerminarPartida(dataPin);
        const data = await res.json();
        if (data.success) {
            limpiarSessionStorage();
            notificarActualizacionHistorial();
            Swal.fire({
                title: 'Exito!',
                text: data.message,
                icon: 'success',
                confirmButtonColor: '#007bff',
            }).then(() => {
                setTimeout(() => {
                    window.location.href = '../views/generarPIN.php';
                }, 1000);
            });
        } else {
            limpiarSessionStorage();
            Swal.fire({
                title: '¡Error!',
                text: data.message,
                icon: 'error',
                confirmButtonColor: '#007bff',
            }).then(() => {
                window.location.href = '../views/generarPIN.php';
            });
        }
    });
}
