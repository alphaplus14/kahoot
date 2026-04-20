const pinIngresado = document.querySelector('#pinIngresado');
const btnIngresarPartida = document.querySelector('#ingresar');
const footer = document.querySelector('#nopin');

if (btnIngresarPartida) {
    btnIngresarPartida.addEventListener('click', (e) => {
        e.preventDefault();
        validarPin();
    });
}

if (pinIngresado) {
    pinIngresado.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
        if (this.value.trim() !== '') {
            this.classList.remove('bg-danger-subtle', 'border-danger-subtle');
        }
    });

    pinIngresado.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            validarPin();
        }
    });
}

async function validarPin() {
    if (!pinIngresado) return;

    const valorIngresado = pinIngresado.value.trim();

    if (valorIngresado.length !== 6) {
        mostrarError('El PIN debe tener exactamente 6 dígitos');
        pinIngresado.classList.add('bg-danger-subtle', 'border-danger-subtle');
        return;
    }

    try {
        const formData = new FormData();
        formData.append('pinIngresado', valorIngresado);

        const res = await csrfFetch('controller/partidas/controllerVerificarPin.php', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        console.log('Respuesta:', data);

        if (data.success === true) {
            mostrarExito('¡PIN correcto! Ingresando...');

            sessionStorage.setItem('partida', JSON.stringify(data.data));
            sessionStorage.setItem('idPartida', String(data.data.id_partida));

            setTimeout(() => {
                window.location.href = 'dist/views/partida.php';
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
    if (!footer) return;
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
    if (!footer) return;
    footer.innerHTML = '';

    const alerta = document.createElement('div');
    alerta.classList.add('alerta', 'bg', 'bg-success', 'text-white');
    alerta.innerHTML = `
        <i class="bi bi-check-circle-fill me-2"></i>
        <span>${mensaje}</span>
    `;

    footer.appendChild(alerta);
}
