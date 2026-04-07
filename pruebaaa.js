import * as sweetAlerts from './sweetAlertsBancoPreguntas.js';

const tablaAdmins = document.querySelector('#tablaCuestionarios');
tablaAdmins.addEventListener('click', (e) => {
    const btn = e.target.closest('.cuestionarioDesactivar, .cuestionarioEditar, .cuestionarioActivar, .verRespuestas');
    if (!btn) return;
    let fila = btn.closest('tr');
    if (fila.classList.contains('child')) {
        fila = fila.previousElementSibling;
    }
    const id = fila.querySelector('td.dtr-control').innerText.trim();
    if (btn.classList.contains('cuestionarioDesactivar')) {
        sweetAlerts.sweetCuestionarioDesactivar(id);
    }
    if (btn.classList.contains('cuestionarioActivar')) {
        sweetAlerts.sweetCuestionarioActivar(id);
    }
    if (btn.classList.contains('cuestionarioEditar')) {
        sweetAlerts.sweetCuestionarioEditar(id);
    }
    if (btn.classList.contains('verRespuestas')) {
        sweetAlerts.sweetCuestionarioVerRespuestas(id);
    }
});

const CuestionarioInsertar = document.querySelector('#cuestionarioInsertar');

CuestionarioInsertar.addEventListener('click', () => {
    sweetAlerts.sweetCuestionarioInsertar();
});
