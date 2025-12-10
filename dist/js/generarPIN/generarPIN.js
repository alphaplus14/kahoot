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
        confirmButtonColor: '#28a745',
        confirmButtonText: 'Aceptar',
    });
}
//TODO Fin Sweet Alertas Error
// #endregion

// #region //* Lanzar sweet errores
//TODO Inicio Lanzar sweet errores
window.onload = function () {
    try {
        document.getElementById('alertasErrores').click();
    } catch (error) {}
};
//TODO Fin Lanzar sweet errores
// #endregion

const select = document.querySelector('#categoria');
const inputLimite = document.querySelector('#limitePreguntas');
const form = document.querySelector('#generarPinForm');
const buttonEnviarForm = document.querySelector('#buttonEnviarForm');

buttonEnviarForm.addEventListener('click', async () => {
    //? Sacar el limite de preguntas que hay en BD
    const opcion = select.options[select.selectedIndex];
    const limitePreguntas = opcion.getAttribute('name');
    //? Si existe una advertencia, se elimina para evitar errores
    if (form.children[3]) {
        form.children[3].remove();
    }
    //? Verificar el limite de preguntas que ingreso el usuario
    if (inputLimite.value < 1 || inputLimite.value > limitePreguntas) {
        inputLimite.classList.add('border', 'border-danger', 'bg', 'bg-danger-subtle');
        const label = document.createElement('label');
        label.classList.add('fs-3');
        if (inputLimite.value < 1) {
            label.textContent = '¡Cuidado, ingresaste un valor errado!';
        } else {
            label.textContent =
                '¡Cuidado, ingresaste un valor errado, solo hay ' +
                limitePreguntas +
                ' preguntas disponibles para la categoria seleccionada!';
        }
        form.append(label);
    } else {
        inputLimite.removeAttribute('class');
        inputLimite.classList.add('form-control', 'limitePreguntasInput');

        const formDataGenerarPIN = new FormData();
        formDataGenerarPIN.append('limitePreguntas', inputLimite.value);
        const jsonGenerarPIN = await fetch('../../controller/pin/controllerGenerarPIN.php', {
            method: 'POST',
            body: formDataGenerarPIN,
        });
        const responseGenerarPIN = await jsonGenerarPIN.json();
        if (responseGenerarPIN.success == true) {
            const categoria = opcion.getAttribute('value');
            const formDataPreguntasPivote = new FormData();
            formDataPreguntasPivote.append('categoria', categoria);
            formDataPreguntasPivote.append('limitePreguntas', inputLimite.value);
            formDataPreguntasPivote.append('pin', responseGenerarPIN.pin);
            const jsonInsertarPivote = await fetch('../../controller/pin/controllerInsertarPreguntasPivote.php', {
                method: 'POST',
                body: formDataPreguntasPivote,
            });
            const responseInsertarPivote = await jsonInsertarPivote.json();
            if (responseInsertarPivote.success == true) {
                Swal.fire({
                    title: 'Exito!',
                    text: responseInsertarPivote.message,
                    icon: 'success',
                    confirmButtonColor: '#007bff',
                }).then(() => {
                    // Guardar PIN en sessionStorage
                    sessionStorage.setItem('pinGenerado', responseGenerarPIN.pin);
                    window.location.href = `../views/pinGenerado.php`;
                });
            } else {
                Swal.fire({
                    title: '¡Error!',
                    text: responseInsertarPivote.message,
                    icon: 'error',
                    confirmButtonColor: '#007bff',
                });
            }
        } else {
            Swal.fire({
                title: '¡Error!',
                text: responseGenerarPIN.message,
                icon: 'error',
                confirmButtonColor: '#007bff',
            });
        }
    }
});
