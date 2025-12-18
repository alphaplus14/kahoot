import * as sweetAlerts from './sweetAlertsDashboard.js';

const tablaAdmins = document.querySelector('#tablaAdministradores');

tablaAdmins.addEventListener('click', (e) => {
    const btn = e.target.closest('.usuarioDesactivar, .usuarioEditar, .usuarioActivar');
    if (!btn) return;
    let fila = btn.closest('tr');
    if (fila.classList.contains('child')) {
        fila = fila.previousElementSibling;
    }
    const primeraColumna = fila.querySelector('td:first-child');
    if (!primeraColumna) {
        console.error('No se encontró la primera columna en la fila:', fila);
        return;
    }
    const id = primeraColumna.innerText.trim();
    if (btn.classList.contains('usuarioDesactivar')) {
        sweetAlerts.sweetUsuarioDesactivar(id);
    }
    if (btn.classList.contains('usuarioActivar')) {
        sweetAlerts.sweetUsuarioActivar(id);
    }
    if (btn.classList.contains('usuarioEditar')) {
        sweetAlerts.sweetUsuarioEditar(id);
    }
});

const usuarioInsertar = document.querySelector('#usuarioInsertar');

usuarioInsertar.addEventListener('click', () => {
    sweetAlerts.sweetUsuarioInsertar();
});
