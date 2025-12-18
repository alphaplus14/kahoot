// función para los eventos
function inicializarEventos() {
    //para que no se oculte el boton en pantallas pequeñas
    document.querySelector('#tablaHistorialPartida').addEventListener('click', async (e) => {
        const btnDetalle = e.target.closest('.btnVerDetalle');
        if (!btnDetalle) return;

        const idPartida = btnDetalle.getAttribute('data-id');

        if (!idPartida) {
            console.error('ID de partida no encontrado');
            Swal.fire('Error', 'No se pudo identificar la partida.', 'error');
            return;
        }

        await verDetallePartida(idPartida);
    });

    // Boton ranking global
    document.querySelectorAll('.btnVerGlobal').forEach((btn) => {
        btn.addEventListener('click', async () => {
            await verRankingGlobal();
        });
    });
}
// Inicializar cuando el DOM esta listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarEventos);
} else {
    // El DOM esta listo
    inicializarEventos();
}

//evento para reinicia la pestaña
window.addEventListener('message', function (event) {
    if (event.data && event.data.type === 'actualizarHistorial') {
        location.reload();
    }
});

//evento para reiniciar la pestaña cuando se cambia el localstorage a otra pestaña o ventana
window.addEventListener('storage', function (event) {
    if (event.key === 'actualizarHistorial') {
        location.reload();
    }
});
