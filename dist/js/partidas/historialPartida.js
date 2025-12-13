// Eventos para los botones de ver detalle
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btnVerDetalle').forEach((btn) => {
        btn.addEventListener('click', async (e) => {
            const idPartida = e.currentTarget.getAttribute('data-id');
            await verDetallePartida(idPartida);
        });
    });
});

window.addEventListener('message', function (event) {
    if (event.data && event.data.type === 'actualizarHistorial') {
        location.reload();
    }
});

window.addEventListener('storage', function (event) {
    if (event.key === 'actualizarHistorial') {
        location.reload();
    }
});
