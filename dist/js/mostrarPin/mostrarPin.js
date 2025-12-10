// Obtener PIN desde sessionStorage
const pin = sessionStorage.getItem('pinGenerado');

if (pin) {
    // Formatear PIN: agregar espacio después de 3 numeros
    let pinFormateado = String(pin);

    // Si el PIN tiene mas de 3 caracteres, insertar espacio
    if (pinFormateado.length > 3) {
        pinFormateado = pinFormateado.substring(0, 3) + ' ' + pinFormateado.substring(3);
    }

    // Mostrar el PIN formateado
    document.getElementById('pin-display').textContent = pinFormateado;
} else {
    // Si no hay PIN, redirigir o mostrar error
    document.getElementById('pin-display').textContent = 'Error: PIN no encontrado';

    setTimeout(() => {
        window.location.href = 'generarPin.php';
    }, 2000);
}
