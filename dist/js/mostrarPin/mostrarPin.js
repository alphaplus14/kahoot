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
const btnTerminar = document.querySelector('#terminarJuego');

if (btnTerminar) {
    btnTerminar.dataset.id = pin;
}
btnTerminar.addEventListener('click', async () => {
    const dataPin = btnTerminar.dataset.id;
    console.log('PIN enviado:', dataPin);

    const formData = new FormData();
    formData.append('pin', dataPin);

    const res = await fetch('../../controller/partidas/controllerTerminarPartida.php', {
        method: 'POST',
        body: formData,
    });
    const data = await res.json();
    if (data.success) {
        Swal.fire({
            title: 'Exito!',
            text: data.message,
            icon: 'success',
            confirmButtonColor: '#007bff',
        }).then(() => {
            setTimeout(() => {
                window.location.href = `../views/generarPin.php`;
            }, 1500);
        });
    } else {
        Swal.fire({
            title: '¡Error!',
            text: data.message,
            icon: 'error',
            confirmButtonColor: '#007bff',
        }).then(() => {
            window.location.href = `../views/generarPin.php`;
        });
    }
});
