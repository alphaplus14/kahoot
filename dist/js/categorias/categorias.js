import * as sweetAlert from './sweetAlertsCategorias.js';

const tablaCategoriasDOM = document.querySelector('#tablaCategorias');

// DataTable
const tablaCategoriasDT = $('#tablaCategorias').DataTable();

tablaCategoriasDOM.addEventListener('click', (e) => {
    const btn = e.target.closest('.categoriaDesactivar, .categoriaEditar, .categoriaActivar');
    if (!btn) return;

    let tr = btn.closest('tr');

    // Si es fila responsive (child), usar la padre
    if (tr.classList.contains('child')) {
        tr = tr.previousElementSibling;
    }

    // Obtener datos reales desde DataTables
    const data = tablaCategoriasDT.row(tr).data();

    if (!data) return;

    const id = data[0];

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
