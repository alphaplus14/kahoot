import * as sweetAlert from './sweetAlertsCategorias.js';

const tablaCategoriasDOM = document.querySelector('#tablaCategorias');

tablaCategoriasDOM.addEventListener('click', (e) => {
    const btn = e.target.closest('.categoriaDesactivar, .categoriaActivar, .categoriaEditar');
    if (!btn) return;
    let fila = btn.closest('tr');
    console.log(fila);
    if (fila.classList.contains('child')) {
        fila = fila.previousElementSibling;
    }
    const id = fila.dataset.id;
    if (btn.classList.contains('categoriaDesactivar')) {
        sweetAlert.sweetCategoriaDesactivar(id);
    }
    if (btn.classList.contains('categoriaActivar')) {
        sweetAlert.sweetCategoriaActivar(id);
    }
    if (btn.classList.contains('categoriaEditar')) {
        sweetAlert.sweetCategoriaEditar(id);
    }
});

const categoriaInsertar = document.querySelector('#categoriaInsertar');

categoriaInsertar.addEventListener('click', () => {
    sweetAlert.sweetCategoriaInsertar();
});
