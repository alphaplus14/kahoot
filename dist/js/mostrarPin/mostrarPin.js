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

if (!tiempoInicio) {
    tiempoInicio = Date.now();
    sessionStorage.setItem('tiempoInicio', tiempoInicio);
} else {
    tiempoInicio = Number(tiempoInicio);
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
            Swal.fire({
                title: 'Tiempo terminado',
                text: 'La partida ha sido finalizada automáticamente.',
                icon: 'info',
                confirmButtonColor: '#007bff',
            }).then(() => {
                setTimeout(() => {
                    window.location.href = `../views/generarPin.php`;
                }, 2500);
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

const btnTerminar = document.querySelector('#terminarJuego');

if (btnTerminar) {
    btnTerminar.dataset.id = pin;
}
btnTerminar.addEventListener('click', async () => {
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
        Swal.fire({
            title: 'Exito!',
            text: data.message,
            icon: 'success',
            confirmButtonColor: '#007bff',
        }).then(() => {
            setTimeout(() => {
                window.location.href = `../views/generarPin.php`;
            }, 1500);
        });
    } else {
        Swal.fire({
            title: '¡Error!',
            text: data.message,
            icon: 'error',
            confirmButtonColor: '#007bff',
        }).then(() => {
            window.location.href = `../views/generarPin.php`;
        });
    }
});
