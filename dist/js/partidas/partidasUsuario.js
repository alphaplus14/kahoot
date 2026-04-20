async function verificarDatosJugadorBD(nombre, ficha, idPartida) {
    try {
        //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('ficha', ficha);
        formData.append('idPartida', idPartida);
        //? Solicitud de datos a controller
        const response = await csrfFetch('../../controller/verify/controllerUsuarioVerify.php', {
            method: 'POST',
            body: formData,
        });
        //? Conversion a JSON valido
        const resultadoUsuarioVerify = await response.json();
        //? Retorno de datos
        return resultadoUsuarioVerify;
    } catch (error) {
        console.log(error);
        return false;
    }
}

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
        const rawId = sessionStorage.getItem('idPartida');
        const idPartida = rawId ? String(rawId).replace(/\D/g, '') : '';
        if (!nombre || !ficha || !idPartida) {
            Swal.fire({
                title: 'Error!', //? Titulo Modal
                icon: 'error', //? Icono Modal
                html: await contenidoFaltaDatos(), //? Contenido HTML
                confirmButtonText: 'Confirmar', //? Texto boton confirmar
                confirmButtonColor: '#2563eb', //? Color boton confirmar
            });
            return false;
        }
        //? Verificacion de Email del Usuario
        let boolDatos = await verificarDatosJugadorBD(nombre, ficha, idPartida);
        if (boolDatos == false) {
            Swal.fire({
                title: '¡Error!',
                text: 'Ya hay un usuario con estos datos (misma partida), ingresa datos diferentes!',
                icon: 'error',
                confirmButtonColor: '#2563eb',
                confirmButtonText: '¡OK!',
            });
            return false;
        }
        const formData = new FormData();
        formData.append('nombreJugador', nombre);
        formData.append('fichaJugador', ficha);
        formData.append('idPartida', idPartida);
        const jsonJuego = await csrfFetch('../../controller/jugadores/controllerInsertarJugador.php', {
            body: formData,
            method: 'POST',
        });
        const responseJuego = await jsonJuego.json();
        if (responseJuego.success == true) {
            Swal.fire({
                title: '¡Exito!',
                text: '¡Entraste a la sala! Espera a que el organizador inicie el juego.',
                icon: 'success',
                confirmButtonColor: '#2563eb',
                confirmButtonText: 'Ir al lobby',
            }).then(() => {
                window.location.href = 'lobbyJugador.php';
            });
        } else {
            Swal.fire({
                title: '¡Error!',
                text: 'Ah ocurrido un error, intenta nuevamente!',
                icon: 'error',
                confirmButtonColor: '#2563eb',
                confirmButtonText: '¡OK!',
            }).then(() => {
                window.location.href = '#';
            });
        }
    }
});
// #endregion
