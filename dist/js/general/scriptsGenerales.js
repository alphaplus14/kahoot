import * as sweetAlerts from '../sweetAlerts.js';

const editarPerfil = document.querySelector('#configuracionPerfil');

editarPerfil.addEventListener('click', () => {
    sweetAlerts.sweetUsuarioEditar(editarPerfil.name);
});
