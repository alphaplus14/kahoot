const input = document.querySelector('#pinIngresado');
const btnIngresar = document.querySelector('#ingresar');
const nopin = document.querySelector('#nopin');

input.addEventListener('click', (e) => {
    input.removeAttribute('class');
    input.classList.add('w-100', 'rounded-2', 'text-center', 'p-3', 'border', 'border-black', 'border-opacity-10');
});

input.addEventListener('blur', (e) => {
    input.removeAttribute('class');
    input.classList.add('p-3', 'form-control', 'text-center');
});

btnIngresar.addEventListener('click', (e) => {
    e.preventDefault();
    Nodatos(input);
});

input.addEventListener('input', (e) => {
    if (input.value.trim() !== '') {
        input.classList.remove('bg-danger-subtle', 'border-danger-subtle');
    }
});

// para evitar que se ingreen letras
const inputPin = document.querySelector('#pinIngresado');

inputPin.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '');
});

function Nodatos(e) {
    if (e.value.trim() === '' || e.value == null) {
        e.classList.add('bg-danger-subtle', 'border-danger-subtle');

        nopin.innerHTML = '';

        const alerta = document.createElement('div');
        alerta.classList.add('alerta', 'bg', 'bg-danger', 'text-white');
        alerta.innerHTML = `
            <i class="bi bi-exclamation-circle-fill me-2"></i>
            <span>Debes ingresar un PIN válido para poder jugar</span>
        `;

        nopin.appendChild(alerta);

        setTimeout(() => {
            alerta.classList.add('fade-out');
        }, 3000);

        setTimeout(() => {
            alerta.remove();
        }, 3800);
    }
}
const pinIngresado = document.querySelector('#pinIngresado');
const btnIngresarPartida = document.querySelector('#ingresar');
const footer = document.querySelector('#nopin');

btnIngresarPartida.addEventListener('click', (e) => {
    e.preventDefault();
    validarPin();
});

pinIngresado.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        validarPin();
    }
});

async function validarPin() {
    const valorIngresado = pinIngresado.value.trim();

    // Validación antes de enviar
    if (valorIngresado.length !== 6) {
        mostrarError('El PIN debe tener exactamente 6 dígitos');
        pinIngresado.classList.add('bg-danger-subtle', 'border-danger-subtle');
        return;
    }

    try {
        const formData = new FormData();
        formData.append('pinIngresado', valorIngresado);

        const res = await fetch('../../controller/partidas/controllerVerificarPin.php', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        console.log('Respuesta:', data);

        if (data.success === true) {
            mostrarExito('¡PIN correcto! Ingresando...');

            // Guardar datos de la partida
            sessionStorage.setItem('partida', JSON.stringify(data.data));

            setTimeout(() => {
                window.location.href = 'partida.php';
            }, 1500);
        } else {
            mostrarError(data.message || 'PIN incorrecto');
            pinIngresado.value = '';
            pinIngresado.classList.add('bg-danger-subtle', 'border-danger-subtle');

            setTimeout(() => {
                window.location.href = 'index.php';
            }, 2500);
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarError('Error en la conexión con el servidor.');
    }
}

function mostrarError(mensaje) {
    footer.innerHTML = '';

    const alerta = document.createElement('div');
    alerta.classList.add('alerta', 'bg', 'bg-danger', 'text-white');
    alerta.innerHTML = `
        <i class="bi bi-exclamation-circle-fill me-2"></i>
        <span>${mensaje}</span>
    `;

    footer.appendChild(alerta);

    setTimeout(() => {
        alerta.classList.add('fade-out');
    }, 3000);

    setTimeout(() => {
        alerta.remove();
    }, 3800);
}

function mostrarExito(mensaje) {
    footer.innerHTML = '';

    const alerta = document.createElement('div');
    alerta.classList.add('alerta', 'bg', 'bg-success', 'text-white');
    alerta.innerHTML = `
        <i class="bi bi-check-circle-fill me-2"></i>
        <span>${mensaje}</span>
    `;

    footer.appendChild(alerta);
}
