import * as sweetAlerts from "./sweetAlertsBancoPreguntas.js";

const tablaAdmins = document.querySelector('#tablaCuestionarios');

tablaAdmins.addEventListener('click', (e) => {
    if (e.target.classList.contains('cuestionarioDesactivar')) {
        const fila = e.target.closest('tr');
        const id = fila.cells[0].innerText;
        sweetAlerts.sweetCuestionarioDesactivar(id);
    }
    if (e.target.classList.contains('cuestionarioActivar')) {
        const fila = e.target.closest('tr');
        const id = fila.cells[0].innerText;
        sweetAlerts.sweetCuestionarioActivar(id);
    }
    if (e.target.classList.contains('cuestionarioEditar')) {
        const fila = e.target.closest('tr');
        const id = fila.cells[0].innerText;
        sweetAlerts.sweetCuestionarioEditar(id);
    }
    if (e.target.classList.contains('verRespuestas')) {
        const fila = e.target.closest('tr');
        const id = fila.cells[0].innerText;
        sweetAlerts.sweetCuestionarioVerRespuestas(id);
    }
});

const CuestionarioInsertar = document.querySelector('#cuestionarioInsertar');

CuestionarioInsertar.addEventListener('click', () => {
    sweetAlerts.sweetCuestionarioInsertar();
});
