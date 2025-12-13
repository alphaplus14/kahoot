// Eventos para los botones de ver detalle
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btnVerDetalle').forEach((btn) => {
        btn.addEventListener('click', async (e) => {
            const idPartida = e.currentTarget.getAttribute('data-id');
            await verDetallePartida(idPartida);
        });
    });
});

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
