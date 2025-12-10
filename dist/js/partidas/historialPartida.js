// Event listener para los botones de ver detalle
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btnVerDetalle').forEach((btn) => {
        btn.addEventListener('click', async (e) => {
            const idPartida = e.currentTarget.getAttribute('data-id');
            await verDetallePartida(idPartida);
        });
    });
});
