import * as sweetAlert from '../sweetAlerts.js';

const tablaAdmins = document.querySelector('#tablaCategorias');

tablaAdmins.addEventListener('click', (e) => {
    if (e.target.classList.contains('categoriaDesactivar')) {
        const fila = e.target.closest('tr');
        const id = fila.cells[0].innerText;
        sweetAlert.sweetCategoriaDesactivar(id);
    }
    if (e.target.classList.contains('categoriaActivar')) {
        const fila = e.target.closest('tr');
        const id = fila.cells[0].innerText;
        sweetAlert.sweetCategoriaActivar(id);
    }
    if (e.target.classList.contains('categoriaEditar')) {
        const fila = e.target.closest('tr');
        const id = fila.cells[0].innerText;
        sweetAlert.sweetCategoriaEditar(id);
    }
});

const categoriaInsertar = document.querySelector('#categoriaInsertar');

categoriaInsertar.addEventListener('click', () => {
    sweetAlert.sweetCategoriaInsertar();
});
