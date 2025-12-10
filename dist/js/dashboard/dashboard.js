import * as sweetAlert from '../sweetAlerts.js';

const tablaAdmins = document.querySelector('#tablaAdministradores');

tablaAdmins.addEventListener('click', (e) => {
    if (e.target.classList.contains('usuarioDesactivar')) {
        const fila = e.target.closest('tr');
        const id = fila.cells[0].innerText;
        sweetAlert.sweetUsuarioDesactivar(id);
    }
    if (e.target.classList.contains('usuarioActivar')) {
        const fila = e.target.closest('tr');
        const id = fila.cells[0].innerText;
        sweetAlert.sweetUsuarioActivar(id);
    }
    if (e.target.classList.contains('usuarioEditar')) {
        const fila = e.target.closest('tr');
        const id = fila.cells[0].innerText;
        sweetAlert.sweetUsuarioEditar(id);
    }
});

const usuarioInsertar = document.querySelector('#usuarioInsertar');

usuarioInsertar.addEventListener('click', () => {
    sweetAlert.sweetUsuarioInsertar();
});
