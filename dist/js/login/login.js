// #region //* Contenido Alertas Error
//TODO Inicio Contenido Alertas Error
async function contenidoAlertasError(message) {
    try {
        //? Texto
        const div = document.createElement('div');
        const p = document.createElement('p');
        p.textContent = message;
        div.append(p);
        return div;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Alertas Error
// #endregion

// #region //* Sweet Alertas Error
//TODO Inicio Sweet Alertas Error
async function sweetAlertasError(message, title) {
    Swal.fire({
        title: title,
        html: await contenidoAlertasError(message),
        icon: 'error',
        confirmButtonColor: '#2563eb',
        confirmButtonText: 'Aceptar',
    });
}
//TODO Fin Sweet Alertas Error
// #endregion

// #region //* Lanzar sweet errores
//TODO Inicio Lanzar sweet errores
window.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('alertasErrores');
    if (!btn) return;
    const message = btn.dataset.message || '';
    const title = btn.dataset.title || '';
    sweetAlertasError(message, title);
});
//TODO Fin Lanzar sweet errores
// #endregion
