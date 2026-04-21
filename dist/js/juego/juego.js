import { sweetCargarDatosJuego } from './sweetAlerts.js';

// SweetAlert2 se carga global (CDN); en módulos ES no existe la variable libre `Swal`.
const Swal = typeof window !== 'undefined' ? window.Swal : undefined;

function urlInicio() {
    return new URL('../../index.php', window.location.href).href;
}

function irAlInicio() {
    window.location.replace(urlInicio());
}

// Decodifica entidades HTML que vienen almacenadas en la BD.
function decodificarTextoBD(texto) {
    const txt = document.createElement('textarea');
    txt.innerHTML = texto ?? '';
    return txt.value;
}

const SELECTORES = {
    pregunta: '#pregunta',
    A: '.respuestaA',
    B: '.respuestaB',
    C: '.respuestaC',
    D: '.respuestaD',
    contador: '#contador',
    puntos: '#puntos',
    form: '.formPreguntas',
};

const ICONO_OK = '   <i class="bi bi-check2-circle"></i>';
const ICONO_X  = '   <i class="bi bi-x-circle"></i>';

const el = {
    pregunta: document.querySelector(SELECTORES.pregunta),
    A:        document.querySelector(SELECTORES.A),
    B:        document.querySelector(SELECTORES.B),
    C:        document.querySelector(SELECTORES.C),
    D:        document.querySelector(SELECTORES.D),
    contador: document.querySelector(SELECTORES.contador),
    puntos:   document.querySelector(SELECTORES.puntos),
    form:     document.querySelector(SELECTORES.form),
};

const botones = { A: el.A, B: el.B, C: el.C, D: el.D };

let preguntas = [];
let segundosPorPregunta = 0;
let indiceActual = 0;
let tiempoRestante = 0;
let intervaloContador = null;
let bloqueado = false;           // True cuando ya se procesó la respuesta o timeout
let historialResumen = [];       // Se usa al terminar para el sweetCargarDatosJuego
let puntosTotales = 0;
let pollEstadoPartida = null;
let finPartidaOrganizador = false;
let pollEstadoEnCurso = false;
const POLL_ESTADO_MS = 2000;

function deshabilitarBotones() {
    Object.values(botones).forEach((b) => b.setAttribute('disabled', 'disabled'));
}

function habilitarBotones() {
    Object.values(botones).forEach((b) => b.removeAttribute('disabled'));
}

function renderIconos(letraCorrecta, letraElegida) {
    // Pinta el check sobre la opción correcta y X sobre las demás.
    for (const letra of ['A', 'B', 'C', 'D']) {
        if (letra === letraCorrecta) {
            botones[letra].innerHTML += ICONO_OK;
        } else if (letra === letraElegida || letraElegida === '' || letraElegida === null) {
            // Cuando no hubo respuesta (timeout) marcamos el resto con X.
            botones[letra].innerHTML += ICONO_X;
        } else {
            botones[letra].innerHTML += ICONO_X;
        }
    }
}

function pintarPregunta() {
    const actual = preguntas[indiceActual];
    el.pregunta.textContent = decodificarTextoBD(actual.pregunta);
    el.A.textContent = 'A: ' + decodificarTextoBD(actual.respuesta_A);
    el.B.textContent = 'B: ' + decodificarTextoBD(actual.respuesta_B);
    el.C.textContent = 'C: ' + decodificarTextoBD(actual.respuesta_C);
    el.D.textContent = 'D: ' + decodificarTextoBD(actual.respuesta_D);
    habilitarBotones();
    bloqueado = false;
    tiempoRestante = segundosPorPregunta;
    iniciarContador();
}

function detenerRelojes() {
    clearInterval(intervaloContador);
    intervaloContador = null;
    if (pollEstadoPartida !== null) {
        clearInterval(pollEstadoPartida);
        pollEstadoPartida = null;
    }
}

function iniciarContador() {
    clearInterval(intervaloContador);
    el.contador.textContent = 'Tiempo Restante: ' + tiempoRestante;
    intervaloContador = setInterval(() => {
        if (bloqueado) return;
        tiempoRestante -= 1;
        if (tiempoRestante <= 0) {
            tiempoRestante = 0;
            el.contador.textContent = 'Tiempo Restante: 0';
            clearInterval(intervaloContador);
            enviarRespuesta(''); // timeout
            return;
        }
        el.contador.textContent = 'Tiempo Restante: ' + tiempoRestante;
    }, 1000);
}

async function enviarRespuesta(letra) {
    if (bloqueado) return;
    bloqueado = true;
    clearInterval(intervaloContador);
    deshabilitarBotones();

    const formData = new FormData();
    formData.append('indice', String(indiceActual));
    formData.append('letra', letra);
    formData.append('tiempo_restante', String(tiempoRestante));

    let datos;
    try {
        const res = await csrfFetch('../../controller/jugadores/controllerRegistrarRespuesta.php', {
            method: 'POST',
            body: formData,
        });
        datos = await res.json();
    } catch (err) {
        console.error('Error al registrar respuesta', err);
        datos = { success: false, message: 'Error de red' };
    }

    if (!datos || datos.success === false) {
        if (datos?.eliminado) {
            detenerRelojes();
            if (Swal) {
                await Swal.fire({
                    title: 'Muerte súbita',
                    text: datos?.message || 'Has sido eliminado.',
                    icon: 'info',
                    confirmButtonColor: '#0d6efd',
                });
            }
            irAlInicio();
            return;
        }
        if (datos?.partida_finalizada) {
            await finalizarPorOrganizador();
            return;
        }
        if (Swal) {
            await Swal.fire({
                title: '¡Error!',
                text: datos?.message || 'No se pudo registrar la respuesta.',
                icon: 'error',
                confirmButtonColor: '#007bff',
            });
        }
        return;
    }

    renderIconos(datos.letra_correcta, letra);
    puntosTotales = datos.puntos_total;
    el.puntos.textContent = 'Puntos: ' + puntosTotales;

    const actual = preguntas[indiceActual];
    const textoSeleccionado = letra === '' ? 'Pregunta no respondida' : actual['respuesta_' + letra];
    const textoCorrecto = actual['respuesta_' + datos.letra_correcta] ?? '';
    historialResumen.push({
        pregunta: actual.pregunta,
        respuesta_A: actual.respuesta_A,
        respuesta_B: actual.respuesta_B,
        respuesta_C: actual.respuesta_C,
        respuesta_D: actual.respuesta_D,
        respuesta_correcta: textoCorrecto,
        respuesta_seleccionada: textoSeleccionado,
    });

    indiceActual += 1;

    if (datos.eliminado) {
        detenerRelojes();
        if (Swal) {
            await Swal.fire({
                title: 'Eliminado',
                text:
                    'En muerte súbita solo permanecen los 5 mejores en la lista del organizador. Has sido eliminado.',
                icon: 'info',
                confirmButtonText: 'Volver al inicio',
                confirmButtonColor: '#0d6efd',
            });
        }
        irAlInicio();
        return;
    }

    setTimeout(() => {
        if (indiceActual >= preguntas.length) {
            terminarJuego();
        } else {
            pintarPregunta();
        }
    }, 3000);
}

async function finalizarPorOrganizador() {
    if (finPartidaOrganizador) return;
    finPartidaOrganizador = true;
    detenerRelojes();
    bloqueado = true;
    deshabilitarBotones();

    let pts = puntosTotales;
    const abortGuard = new AbortController();
    const abortTid = window.setTimeout(() => abortGuard.abort(), 12000);
    try {
        const formData = new FormData();
        const res = await csrfFetch('../../controller/jugadores/controllerInsertarPuntosJugador.php', {
            method: 'POST',
            body: formData,
            signal: abortGuard.signal,
        });
        const data = await res.json();
        if (typeof data.puntos_total === 'number') {
            pts = data.puntos_total;
            puntosTotales = pts;
        }
    } catch (err) {
        console.error('Error guardando puntos al cerrar partida', err);
    } finally {
        window.clearTimeout(abortTid);
    }

    // Si Swal no está disponible en módulos ES, el resumen largo fallaba y la pantalla quedaba fija.
    const escapeId = window.setTimeout(() => irAlInicio(), 8000);

    try {
        if (Swal) {
            await Swal.fire({
                title: 'Partida finalizada',
                html: `<p class="mb-2">El organizador cerró la partida.</p><p class="mb-0"><strong>Puntos guardados: ${pts}</strong></p>`,
                icon: 'info',
                confirmButtonText: 'Volver al inicio',
                confirmButtonColor: '#0d6efd',
                allowOutsideClick: true,
            });
        } else {
            window.alert(`Partida finalizada. Puntos: ${pts}`);
        }
    } catch (e) {
        console.error('finalizarPorOrganizador', e);
        window.alert('Partida finalizada');
    } finally {
        window.clearTimeout(escapeId);
    }
    irAlInicio();
}

async function consultarEstadoPartida() {
    if (finPartidaOrganizador || pollEstadoEnCurso) return;
    pollEstadoEnCurso = true;
    try {
        const res = await fetch('../../controller/partidas/controllerEstadoPartidaJugador.php', {
            credentials: 'same-origin',
        });
        let data;
        try {
            data = await res.json();
        } catch (parseErr) {
            return;
        }
        if (data.expulsado) {
            detenerRelojes();
            if (Swal) {
                await Swal.fire({
                    title: 'Fuiste quitado de la partida',
                    text: data.message || 'Ya no estás en esta partida.',
                    icon: 'warning',
                    confirmButtonColor: '#007bff',
                });
            }
            irAlInicio();
            return;
        }
        if (data.eliminado_ms) {
            detenerRelojes();
            if (Swal) {
                await Swal.fire({
                    title: 'Eliminado',
                    text: data.message || 'Has sido eliminado de la muerte súbita.',
                    icon: 'info',
                    confirmButtonColor: '#0d6efd',
                });
            }
            irAlInicio();
            return;
        }
        const est = String(data.estado ?? '').trim();
        if (data.success && est.toLowerCase() === 'finalizada') {
            await finalizarPorOrganizador();
        }
    } catch (e) {
        console.debug('poll estado partida', e);
    } finally {
        pollEstadoEnCurso = false;
    }
}

async function terminarJuego() {
    if (finPartidaOrganizador) return;
    finPartidaOrganizador = true;
    detenerRelojes();
    try {
        const formData = new FormData();
        const res = await csrfFetch('../../controller/jugadores/controllerInsertarPuntosJugador.php', {
            method: 'POST',
            body: formData,
        });
        const data = await res.json();
        if (data.success === false && Swal) {
            await Swal.fire({
                title: '¡Error!',
                text: data.message,
                icon: 'error',
                confirmButtonColor: '#007bff',
            });
        }
        if (typeof data.puntos_total === 'number') {
            puntosTotales = data.puntos_total;
        }
    } catch (err) {
        console.error('Error terminando juego', err);
    }
    await sweetCargarDatosJuego(historialResumen, puntosTotales);
}

function manejarClick(e) {
    if (bloqueado) return;
    const target = e.target;
    let letra = '';
    if (target.classList.contains('respuestaA')) letra = 'A';
    else if (target.classList.contains('respuestaB')) letra = 'B';
    else if (target.classList.contains('respuestaC')) letra = 'C';
    else if (target.classList.contains('respuestaD')) letra = 'D';
    else return;
    enviarRespuesta(letra);
}

async function iniciar() {
    try {
        const res = await csrfFetch('../../controller/jugadores/controllerJugadorCargarPreguntas.php');
        const datos = await res.json();
        if (!Array.isArray(datos) || datos.length === 0) {
            if (datos?.eliminado) {
                if (Swal) {
                    await Swal.fire({
                        title: 'Muerte súbita',
                        text: datos?.message || 'Fuiste eliminado.',
                        icon: 'info',
                        confirmButtonColor: '#0d6efd',
                    });
                }
                irAlInicio();
                return;
            }
            if (Swal) {
                await Swal.fire({
                    title: '¡Error!',
                    text: datos?.message || 'No se pudieron cargar las preguntas.',
                    icon: 'error',
                    confirmButtonColor: '#007bff',
                });
            }
            location.reload();
            return;
        }
        preguntas = datos;
        segundosPorPregunta = datos[0].segundos_pregunta_partida;
        el.form.addEventListener('click', manejarClick);
        pintarPregunta();
        consultarEstadoPartida();
        pollEstadoPartida = setInterval(consultarEstadoPartida, POLL_ESTADO_MS);
    } catch (err) {
        console.error('Error cargando juego', err);
    }
}

iniciar();
