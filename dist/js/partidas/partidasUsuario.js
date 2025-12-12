// #region //* Insertar datos jugador y empezar juego

async function contenidoFaltaDatos() {
    try {
        const form = document.createElement('form');
        //? Label (texto)
        const labelDiv = document.createElement('div');
        labelDiv.classList.add('mb-2');
        const label = document.createElement('label');
        label.classList.add('form-label');
        label.textContent = '¡Todos los campos son requeridos, porfavor llena todos los campos para continuar!';
        labelDiv.append(label);
        //? Asignacion final Form
        form.append(labelDiv);
        //? Retorno de HTML
        return form;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const btnIngresarJuego = document.querySelector('.btnEntrarPartida');

btnIngresarJuego.addEventListener('click', () => {
    insertarJugador();
    async function insertarJugador(params) {
        const nombre = document.querySelector('#nombre').value.trim();
        const ficha = document.querySelector('#ficha').value.trim();
        const pin = sessionStorage.getItem('idPartida');
        if (!nombre || !ficha) {
            Swal.fire({
                title: 'Error!', //? Titulo Modal
                icon: 'error', //? Icono Modal
                html: await contenidoFaltaDatos(), //? Contenido HTML
                confirmButtonText: 'Confirmar', //? Texto boton confirmar
                confirmButtonColor: '#007bff', //? Color boton confirmar
            });
            return false;
        }
        const formData = new FormData();
        formData.append('nombreJugador', nombre);
        formData.append('fichaJugador', ficha);
        formData.append('pinPartida', pin);
        const jsonJuego = await fetch('../../controller/jugadores/controllerInsertarJugador.php', {
            body: formData,
            method: 'POST',
        });
        const responseJuego = await jsonJuego.json();
        if (responseJuego.success == true) {
            Swal.fire({
                title: '¡Exito!',
                text: '¡Datos registrados, preparate para responder!',
                icon: 'success',
                confirmButtonColor: '#007bff',
                confirmButtonText: '¡Empezar!',
            }).then(() => {
                window.location.href = 'juego.php';
            });
        } else {
            Swal.fire({
                title: '¡Error!',
                text: 'Ah ocurrido un error, intenta nuevamente!',
                icon: 'error',
                confirmButtonColor: '#007bff',
                confirmButtonText: '¡OK!',
            }).then(() => {
                window.location.href = '#';
            });
        }
    }
});
// #endregion
