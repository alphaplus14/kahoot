import * as sweetalert from '../sweetAlerts.js';

const input = document.querySelector('#pin');
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
const inputPin = document.querySelector('#pin');

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
