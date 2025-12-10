import {sweetUsuarioEditar} from '../dashboard/sweetAlertsDashboard.js';
// #region //* Definicion de Funciones createElement
//! /////////////////////////////////////////////////////////
//! Definicion de Funciones createElement
//! /////////////////////////////////////////////////////////

// #region //* Crear Form
//TODO Inicio form
function crearForm() {
    try {
        //? Creacion de elemento Form
        let form = document.createElement('form');
        //? Retorno de elemento
        return form;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin form
// #endregion

// #region //* Crear LabelForm
//TODO Inicio label
function crearLabelForm(labelFor, text) {
    try {
        //? Creacion de elemento Label
        let label = document.createElement('label');
        label.classList.add('form-label');
        label.setAttribute('for', labelFor);
        label.textContent = text;
        //? Retorno de elemento
        return label;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin label
// #endregion

// #region //* Crear InputForm
//TODO Inicio Input
function crearInputForm(inputId, type, value) {
    try {
        //? Creacion de elemento Input
        let input = document.createElement('input');
        input.classList.add('form-control');
        input.setAttribute('type', type);
        input.setAttribute('id', inputId);
        input.setAttribute('value', value);
        //? Retorno de elemento
        return input;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Input
// #endregion

// #region //* Crear DivForm
//TODO Inicio Div Form
function crearDivForm() {
    try {
        //? Creacion de elemento DivForm
        let div = document.createElement('div');
        div.classList.add('mb-3');
        //? Retorno de elemento
        return div;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Div Form
// #endregion

// #region //* Crear SelectForm
//TODO Inicio Select Form
function crearSelectForm(selectId) {
    try {
        //? Creacion de elemento Select
        let select = document.createElement('select');
        select.classList.add('form-select');
        select.setAttribute('id', selectId);
        //? Retorno de elemento
        return select;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Select Form
// #endregion

// #region //* Crear OptionForm
//TODO Inicio Option
function crearOptionForm(value, text, selected) {
    try {
        //? Creacion de elemento Option
        let option = document.createElement('option');
        option.setAttribute('value', value);
        option.textContent = text;
        //? True: Se aplica selected al option // False: No se aplica nada
        if (selected == true) {
            option.setAttribute('selected', 'selected');
        }
        //? Retorno de elemento
        return option;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Option
// #endregion

// #region //* Crear Button
//TODO Inicio Button
function crearButton(type, text) {
    try {
        //? Creacion de elemento Button
        let button = document.createElement('button');
        button.classList.add('btn', 'btn-primary');
        button.setAttribute('type', type);
        button.textContent = text;
        //? Retorno de elemento
        return button;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Button
// #endregion

// #region //* Crear Parrafo
//TODO Inicio Button
function crearParrafo(text) {
    try {
        //? Creacion de elemento P (parrafo)
        let p = document.createElement('p');
        p.textContent = text;
        //? Retorno de elemento
        return p;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Button
// #endregion

// #region //* Crear Div Personalizado
//TODO Inicio Div Personalizado
function crearDivPersonalizado(id, ...clase) {
    try {
        //? Se usa parametro tipo rest (...),
        //? basicamente para que ese parametro no tenga limite y se pueda repetir mediante comas ","
        //? en la invocacion de la funcion

        //? Creacion de elemento Div
        const div = document.createElement('div');
        //? ID
        div.setAttribute('id', id);
        //? Se agregan las clases (con parametro tipo rest)
        div.classList.add(...clase);
        //? Retorno de elemento
        return div;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Div Personalizado
// #endregion

// #region //* Crear Lista
//TODO Inicio Crear Lista
function crearLista(tipoLista, id) {
    try {
        //? Creacion de elemento Lista
        const lista = document.createElement(`${tipoLista}`);
        //? ID
        lista.setAttribute('id', id);
        //? Retorno de elemento
        return lista;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Crear Lista
// #endregion

// #region //* Crear Li (lista)
//TODO Inicio Crear Li (lista)
function crearLi(text) {
    try {
        //? Creacion de elemento Lista
        const li = document.createElement('li');
        //? Texto li
        li.textContent = text;
        //? Retorno de elemento
        return li;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Crear Lista
// #endregion

//! /////////////////////////////////////////////////////////
//! FIN Definicion de Funciones createElement
//! /////////////////////////////////////////////////////////

// #endregion

// #region //* Funciones Generales
//! /////////////////////////////////////////////////////////
//! Funciones Generales
//! /////////////////////////////////////////////////////////

// #region //* Verificar Email
//TODO Inicio Funcion verificarEmail
export async function verificarEmail(email) {
    try {
        //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
        const formData = new FormData();
        formData.append('email', email);
        //? Solicitud de datos a controller
        const response = await fetch('../../controller/verify/controllerVerifyEmail.php', {
            method: 'POST',
            body: formData,
        });
        //? Conversion a JSON valido
        const resultadoEmailVerify = await response.json();
        //? Retorno de datos
        return resultadoEmailVerify;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Funcion verificarEmail
// #endregion

// #region //* Traer Datos Usuario (por id)
//TODO Inicio Funcion Traer Datos Usuario (por id)
export async function traerDatosUsuarioPorID(id) {
    try {
        //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
        const formData = new FormData();
        formData.append('id', id);
        //? Solicitud de datos a controller
        const json = await fetch(`../../controller/usuarios/controllerDatosUsuarioPorID.php`, {
            method: 'POST',
            body: formData,
        });
        //? Conversion a JSON valido
        const datos = await json.json();
        //? Retorno de datos
        return datos;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Funcion Traer Datos Usuario (por id)
// #endregion

//! /////////////////////////////////////////////////////////
//! FIN Funciones Generales
//! /////////////////////////////////////////////////////////
// #endregion

// #region //* Editar perfil
const editarPerfil = document.querySelector('#configuracionPerfil');

editarPerfil.addEventListener('click', () => {
    sweetUsuarioEditar(editarPerfil.name);
});

// #endregion

// #region //* Sweet Politica & Privacidad
//TODO Inicio SweetAlert Activar Usuario
export async function sweetPoliticaPrivacidad() {
    try {
        Swal.fire({
            title: 'Politica & Privacidad', //? Titulo Modal
            html: await contenidoPoliticaPrivacidad(), //? Contenido HTML
            confirmButtonText: 'Aceptar', //? Texto boton confirmar
            focusConfirm: false, //? Desactivar focus al boton crear
            confirmButtonColor: '#007bff', //? Color boton confirmar
        });
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin SweetAlert Activar Usuario
// #endregion

// #region //* Sweet Terminos & Condiciones
//TODO Inicio SweetAlert Activar Usuario
export async function sweetTerminosCondiciones() {
    try {
        Swal.fire({
            title: 'Terminos & Condiciones', //? Titulo Modal
            html: await contenidoTerminosCondiciones(), //? Contenido HTML
            confirmButtonText: 'Aceptar', //? Texto boton confirmar
            focusConfirm: false, //? Desactivar focus al boton crear
            confirmButtonColor: '#007bff', //? Color boton confirmar
        });
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}

//TODO Fin SweetAlert Activar Usuario
// #endregion
