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
        window.location.href = 'generarPin.php';
    }, 2000);
}
// Tiempo maximo que el pin va a estar habilitado para actualizar el estado del juego
const TIEMPO_LIMITE = 10 * 60 * 1000;

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
    sessionStorage.removeItem('pinAlmacenadoParaTiempo');
}

async function finalizarPinAnterior(pinAnterior) {
    if (!pinAnterior) return;

    try {
        const formData = new FormData();
        formData.append('pin', pinAnterior);

        await fetch('../../controller/partidas/controllerTerminarPartida.php', {
            method: 'POST',
            body: formData,
        });

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
    const formData = new FormData();
    formData.append('pin', pin);

    fetch('../../controller/partidas/controllerTerminarPartida.php', {
        method: 'POST',
        body: formData,
    })
        .then((res) => res.json())
        .then((data) => {
            limpiarSessionStorage();
            Swal.fire({
                title: 'Tiempo terminado',
                text: 'La partida ha sido finalizada automáticamente.',
                icon: 'info',
                confirmButtonColor: '#007bff',
            }).then(() => {
                window.location.href = `../views/generarPin.php`;
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

const btnVolver = document.querySelector('a[href="generarPin.php"]');
if (btnVolver) {
    btnVolver.addEventListener('click', async (e) => {
        e.preventDefault();

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
            window.location.href = 'generarPin.php';
        }
    });
}
const btnTerminar = document.querySelector('#terminarJuego');

if (btnTerminar) {
    btnTerminar.dataset.id = pin;
}
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

    const formData = new FormData();
    formData.append('pin', dataPin);

    const res = await fetch('../../controller/partidas/controllerTerminarPartida.php', {
        method: 'POST',
        body: formData,
    });
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
                window.location.href = "../views/generarPin.php";
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
            window.location.href = "../views/generarPin.php";
        });
    }
});