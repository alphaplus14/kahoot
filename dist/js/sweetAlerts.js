'use strict';

// #region //* Eventos Botones
//! /////////////////////////////////////////////////////////
//! Eventos de Botones
//! /////////////////////////////////////////////////////////

// #region //* Usuario Insertar
//TODO Inicio Usuario Insertar
//? Se capturan todos los botones en un arreglo (creado por defecto)
let usuarioInsertar = document.querySelectorAll('#usuarioInsertar');
usuarioInsertar.forEach((element) => {
    //? Se añade el evento click a cada boton capturado
    element.addEventListener('click', () => {
        //? Se llama el SweetAlert correspondiente
        sweetUsuarioInsertar();
    });
});
//TODO Fin Usuario Insertar
// #endregion

// #region //* Configuracion Perfil

//TODO Inicio Configuracion Perfil
//? Se capturan todos los botones en un arreglo (creado por defecto)
let configuracionPerfil = document.querySelectorAll('#configuracionPerfil');
configuracionPerfil.forEach((element) => {
    //? Se añade el evento click a cada boton capturado
    element.addEventListener('click', () => {
        //? Se llama el SweetAlert correspondiente
        sweetConfiguracionPerfil(element.name);
    });
});
//TODO Fin Configuracion Perfil
// #endregion

// #region //* Politica & Privacidad
//TODO Inicio Politica & Privacidad
//? Se capturan todos los botones en un arreglo (creado por defecto)
let politicaPrivacidad = document.querySelectorAll('#politicaPrivacidad');
politicaPrivacidad.forEach((element) => {
    //? Se añade el evento click a cada boton capturado
    element.addEventListener('click', () => {
        //? Se llama el SweetAlert correspondiente
        sweetPoliticaPrivacidad();
    });
});
//TODO Fin Politica & Privacidad
// #endregion

// #region //* Terminos & Condiciones
//TODO Inicio Terminos & Condiciones
//? Se capturan todos los botones en un arreglo (creado por defecto)
let terminosCondiciones = document.querySelectorAll('#terminosCondiciones');
terminosCondiciones.forEach((element) => {
    //? Se añade el evento click a cada boton capturado
    element.addEventListener('click', () => {
        //? Se llama el SweetAlert correspondiente
        sweetTerminosCondiciones();
    });
});
//TODO Fin Terminos & Condiciones
// #endregion

// #region //* Reserva Libros Insertar
//TODO Inicio Reserva Libros Insertar
const reservaInsertar = document.querySelectorAll('#reservaLibros');
reservaInsertar.forEach((element) => {
    element.addEventListener('click', () => {
        sweetReservaLibros(element.name);
    });
});
//TODO Fin Reserva Libros Insertar
// #endregion

// #region //* Generar Archivos
//TODO Inicio Generar Archivos
const generarArchivos = document.querySelectorAll('#generarArchivos');
generarArchivos.forEach((element) => {
    element.addEventListener('click', () => {
        sweetGenerarArchivos();
    });
});
//TODO Fin Generar Archivos
// #endregion

// #region //* Agregar Libro
const btnAgregarLibro = document.querySelectorAll('#agregarLibro');
btnAgregarLibro.forEach((element) => {
    element.addEventListener('click', () => {
        sweetLibroInsertar();
    });
});
// #endregion

// #region //* Prestamo registro
//TODO Inicio Prestamo Registro
const registrarPrestamo = document.querySelectorAll('#registrarPrestamo');
registrarPrestamo.forEach((element) => {
    element.addEventListener('click', () => {
        sweetRegistrarPrestamo();
    });
});
//TODO Fin Prestamo Registro
// #endregion

// #region //* Lanzar sweet errores
//TODO Inicio Lanzar sweet errores
window.onload = function () {
    const a = document.getElementById('alertasErrores').click();
};
//TODO Fin Lanzar sweet errores
// #endregion

//! /////////////////////////////////////////////////////////
//! FIN Eventos de Botones
//! /////////////////////////////////////////////////////////

// #endregion

// #region //* Funciones Generales
//! /////////////////////////////////////////////////////////
//! Funciones Generales
//! /////////////////////////////////////////////////////////

// #region //* Verificar Email
//TODO Inicio Funcion verificarEmail
async function verificarEmail(email) {
    try {
        //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
        const formData = new FormData();
        formData.append('email', email);
        //? Solicitud de datos a controller
        const response = await fetch('../controller/controllerVerifyEmail.php', {
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

// #region //* Verificar ISBN
//TODO Funcion verificarISBN INICIO
async function verificarISBN(isbn) {
    try {
        if (!isbn || isbn.trim() === '') {
            return true; //revisar si se debe dejar el isbn como opcional.
        }
        //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
        const formData = new FormData();
        formData.append('isbnLibro', isbn);
        //? Solicitud de datos a controller
        let resultadoISBNVerify = await fetch('../controller/controllerVerifyISBN.php', {
            method: 'POST',
            body: formData,
        });
        const datos = resultadoISBNVerify.json();
        return datos;
    } catch (e) {
        console.log(e);
        return false;
    }
}
//TODO Funcion verificarISBN FIN
// #endregion

// #region //* Traer Datos Usuario (por id)
//TODO Inicio Funcion Traer Datos Usuario (por id)
async function traerDatosUsuarioPorID(id) {
    try {
        //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
        const formData = new FormData();
        formData.append('id', id);
        //? Solicitud de datos a controller
        const json = await fetch(`../controller/controllerDatosUsuarioPorID.php`, {
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

// #region //* Traer Datos Tabla Pivote Libro Has Reservas (por id)
//TODO Inicio Traer Datos Tabla Pivote (por id)
async function traerDatosLibrosHasReservasPorID(id) {
    try {
        //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
        const formData = new FormData();
        formData.append('id', id);
        //? Solicitud de datos a controller
        const response = await fetch('../controller/controllerDatosLibroHasReservaPorID.php', {
            method: 'POST',
            body: formData,
        });
        //? Conversion a JSON valido
        const datos = await response.json();
        //? Retorno de datos
        return datos;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Traer Datos Tabla Pivote (por id)
// #endregion

// #region //* Traer Datos Tabla Pivote Libro Has Categorias (por id)
//TODO Inicio Traer Datos Tabla Pivote (por id)
async function traerDatosLibrosHasCategoriaPorID(id) {
    try {
        //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
        const formData = new FormData();
        formData.append('id', id);
        //? Solicitud de datos a controller
        const response = await fetch('../controller/controllerDatosLibroHasCategoriaPorID.php', {
            method: 'POST',
            body: formData,
        });
        //? Conversion a JSON valido
        const datos = await response.json();
        //? Retorno de datos
        return datos;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Traer Datos Tabla Pivote (por id)
// #endregion

// #region //* Traer Datos Libros
//TODO Inicio Traer Datos Libros
async function traerDatosLibros() {
    try {
        //? Solicitud de datos a controller
        const response = await fetch(`../controller/controllerDatosLibros.php`);
        //? Conversion a JSON valido
        const datos = await response.json();
        //? Retorno de datos
        return datos;
    } catch (e) {
        console.log(e);
        return false;
    }
}
//TODO Fin Traer Datos Libros
// #endregion

// #region //* Traer Datos Libro (por id)
//TODO Inicio Traer Datos Libro (por id)
async function traerDatosLibroPorID(id) {
    try {
        //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
        const formData = new FormData();
        formData.append('idLibro', id);
        //? Solicitud de datos a controller
        const response = await fetch(`../controller/controllerLibroObtener.php`, {
            method: 'POST',
            body: formData,
        });
        //? Conversion a JSON valido
        const datos = await response.json();
        //? Retorno de datos
        return datos;
    } catch (e) {
        console.log(e);
        return false;
    }
}
//TODO Fin Traer Datos Libro (por id)
// #endregion

// #region //* Traer Datos Ultima Reserva
//TODO Inicio Traer Datos Ultima Reserva
async function traerDatosUltimaReserva() {
    try {
        //? Solicitud de datos a controller
        const response = await fetch('../controller/controllerDatosUltimaReserva.php');
        //? Conversion a JSON valido
        const datos = await response.json();
        //* console.log(datos);
        //? Retorno de datos (Al usar un "Alias" en la consulta, toca acceder a un tipo de array (estudiar el objeto retornado))
        return datos[0].idReserva;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Traer Datos Ultima Reserva
// #endregion

// #region //* Traer Datos Ultimo LibroHasCategoria
//TODO Inicio Traer Datos Ultima LibroHasCategoria
async function traerDatosUltimoLibro() {
    try {
        //? Solicitud de datos a controller
        const response = await fetch('../controller/controllerDatosUltimoLibro.php');
        //? Conversion a JSON valido
        const datos = await response.json();
        // console.log(datos);
        //? Retorno de datos (Al usar un "Alias" en la consulta, toca acceder a un tipo de array (estudiar el objeto retornado))
        return datos[0].idLibro;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Traer Datos Ultimo LibroHasCategoria
// #endregion

// #region //* Traer Datos Reserva (por id)
//TODO Inicio Traer Datos Reserva (por id)
async function traerDatosReservaPorID(id) {
    try {
        //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
        const formData = new FormData();
        formData.append('idReserva', id);
        //? Solicitud de datos a controller
        const response = await fetch('../controller/controllerDatosReservaPorID.php', {
            method: 'POST',
            body: formData,
        });
        //? Conversion a JSON valido
        const datos = await response.json();
        //? Retorno de datos
        return datos;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Traer Datos Reserva (por id)
// #endregion

// #region //* Traer Datos Categorias
//TODO Inicio Traer Datos Categorias
async function traerDatosCategorias() {
    try {
        //? Solicitud de datos a controller
        const response = await fetch('../controller/controllerDatosCategorias.php', {
            method: 'POST',
        });
        //? Conversion a JSON valido
        // console.log(response);
        const datos = await response.json();
        //? Retorno de datos
        return datos;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Traer Datos Categorias
// #endregion

// #region //* Traer Datos Reservas Aprobadas
//TODO Inicio Traer Datos Reservas Aprobadas
async function traerDatosReservasAprobadas() {
    try {
        const response = await fetch('../controller/controllerDatosReservasAprobadas.php');
        const datos = await response.json();
        return datos;
    } catch (e) {
        console.log(e);
        return false;
    }
}
//TODO Fin Traer Datos Reservas Aprobadas
// #endregion

// #region //* Traer Datos Prestamo (por id)
//TODO Inicio Traer Datos Prestamo (por id)
async function traerDatosPrestamoPorID(idPrestamo) {
    try {
        const formData = new FormData();
        formData.append('idPrestamo', idPrestamo);
        const response = await fetch('../controller/controllerDatosPrestamoPorID.php', {
            method: 'POST',
            body: formData,
        });
        const datos = await response.json();
        return datos;
    } catch (e) {
        console.log(e);
        return false;
    }
}
//TODO Fin Traer Datos Prestamo (por id)
// #endregion

// #region //* Filtar Reservas Modal
//TODO Funcion filtrar reservas en el modal
function filtrarReservasModal() {
    const input = document.getElementById('buscarReservaModal');
    const filter = input.value.toLowerCase();
    const table = document.getElementById('tablaReservasAprobadas');
    const rows = table.getElementsByClassName('reserva-row');

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const text = row.textContent || row.innerText;

        if (text.toLowerCase().indexOf(filter) > -1) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}
//TODO Fin filtrar reservas
// #endregion

// #region //* Enviar Email Reserva
//TODO Funcion enviar email de reserva
async function enviarEmailReserva(idReserva, email) {
    try {
        Swal.fire({
            title: 'Enviando correo...',
            text: 'Por favor espera',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        const response = await $.ajax({
            url: '../controller/controllerEnviarEmailReserva.php',
            type: 'POST',
            data: {
                idReserva: idReserva,
                email: email,
            },
            dataType: 'json',
        });

        if (response.success) {
            Swal.fire({
                title: 'Correo Enviado!',
                text: response.message || 'El correo fue enviado exitosamente',
                icon: 'success',
                confirmButtonColor: '#28a745',
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: response.message || 'No se pudo enviar el correo',
                icon: 'error',
                confirmButtonColor: '#dc3545',
            });
        }
    } catch (e) {
        console.log(e);
        Swal.fire({
            title: 'Error!',
            text: 'Error al procesar la solicitud',
            icon: 'error',
            confirmButtonColor: '#dc3545',
        });
    }
}
//TODO Fin enviar email
// #endregion

//! /////////////////////////////////////////////////////////
//! FIN Funciones Generales
//! /////////////////////////////////////////////////////////
// #endregion

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

// #region //* Contenidos de HTML para los SweetAlert
//! /////////////////////////////////////////////////////////
//! Contenidos de HTML para los SweetAlert
//! /////////////////////////////////////////////////////////

// #region //* Contenido Usuario Insertar
//TODO Inicio Contenido Usuario Insertar
async function contenidoUsuarioInsertar() {
    try {
        //? Se traen todos los tipos de usuario disponibles
        const jsonTipoUsuario = await fetch('../controller/controllerDatosTipoUsuario.php');
        const datosTipoUsuario = await jsonTipoUsuario.json();
        //? Inicio Formulario
        const form = crearForm();
        //? Nombre
        const nombreDiv = crearDivForm();
        const nombreLabel = crearLabelForm('nombreUsuario', 'Nombre');
        const nombreInput = crearInputForm('nombreUsuario', 'text', '');
        nombreDiv.append(nombreLabel);
        nombreDiv.append(nombreInput);
        //? Apellido
        const apellidoDiv = crearDivForm();
        const apellidoLabel = crearLabelForm('apellidoUsuario', 'Apellido');
        const apellidoInput = crearInputForm('apellidoUsuario', 'text', '');
        apellidoDiv.append(apellidoLabel);
        apellidoDiv.append(apellidoInput);
        //? Email
        const emailDiv = crearDivForm();
        const emailLabel = crearLabelForm('emailUsuario', 'Email');
        const emailInput = crearInputForm('emailUsuario', 'email', '');
        emailDiv.append(emailLabel);
        emailDiv.append(emailInput);
        //? Pass
        const passDiv = crearDivForm();
        const passLabel = crearLabelForm('passUsuario', 'Contraseña');
        const passInput = crearInputForm('passUsuario', 'password', '');
        passDiv.append(passLabel);
        passDiv.append(passInput);
        //? Select
        const selectDiv = crearDivForm();
        const select = crearSelectForm('tipoUsuario');
        const optionSelected = crearOptionForm('', 'Seleccione una opcion', true);
        select.append(optionSelected);
        //? Option
        datosTipoUsuario.forEach((tipoUsuario) => {
            const option = crearOptionForm(tipoUsuario.idTipoUsuario, tipoUsuario.tipoUsuario, false);
            select.append(option);
        });
        selectDiv.append(select);
        //? Asignacion final Form
        form.append(nombreDiv);
        form.append(apellidoDiv);
        form.append(emailDiv);
        form.append(passDiv);
        form.append(selectDiv);
        //? Retorno de HTML
        return form;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Usuario Insertar
// #endregion

// #region //* Contenido Usuario Editar
//TODO Inicio Contenido Usuario Editar
async function contenidoUsuarioEditar(id) {
    try {
        //? Se traen datos de usuario por ID
        const datosUsuario = await traerDatosUsuarioPorID(id);
        //? Se traen todos los tipos de usuario disponibles
        const jsonTipoUsuario = await fetch(`../controller/controllerDatosTipoUsuario.php`);
        const datosTipoUsuario = await jsonTipoUsuario.json();
        //? Inicio Formulario
        const form = crearForm();
        //? Nombre
        const nombreDiv = crearDivForm();
        const nombreLabel = crearLabelForm('nombreUsuario', 'Nombre');
        const nombreInput = crearInputForm('nombreUsuario', 'text', datosUsuario[0].nombreUsuario);
        nombreDiv.append(nombreLabel);
        nombreDiv.append(nombreInput);
        //? Apellido
        const apellidoDiv = crearDivForm();
        const apellidoLabel = crearLabelForm('apellidoUsuario', 'Apellido');
        const apellidoInput = crearInputForm('apellidoUsuario', 'text', datosUsuario[0].apellidoUsuario);
        apellidoDiv.append(apellidoLabel);
        apellidoDiv.append(apellidoInput);
        //? Email
        const emailDiv = crearDivForm();
        const emailLabel = crearLabelForm('emailUsuario', 'Correo');
        const emailInput = crearInputForm('emailUsuario', 'email', datosUsuario[0].emailUsuario);
        emailDiv.append(emailLabel);
        emailDiv.append(emailInput);
        //? Password
        const passDiv = crearDivForm();
        const passLabel = crearLabelForm('passUsuario', 'Contraseña');
        const passInput = crearInputForm('passUsuario', 'password', '');
        passDiv.append(passLabel);
        passDiv.append(passInput);
        //? Tipo Usuario
        const selectDiv = crearDivForm();
        const select = crearSelectForm('tipoUsuario');
        datosTipoUsuario.forEach((tipoUsuario) => {
            if (tipoUsuario.idTipoUsuario == datosUsuario[0].fkTipoUsuario) {
                const optionSelected = crearOptionForm(tipoUsuario.idTipoUsuario, tipoUsuario.tipoUsuario, true);
                select.append(optionSelected);
            } else {
                const option = crearOptionForm(tipoUsuario.idTipoUsuario, tipoUsuario.tipoUsuario, false);
                select.append(option);
            }
        });
        selectDiv.append(select);
        //? Asignacion final Form

        form.append(nombreDiv);
        form.append(apellidoDiv);
        form.append(emailDiv);
        form.append(passDiv);
        form.append(selectDiv);
        //? Retorno de HTML
        return form;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Usuario Editar
// #endregion

// #region //* Contenido Usuario Activar
//TODO Inicio Contenido Usuario Activar
async function contenidoUsuarioActivar(id) {
    try {
        //? Se traen datos de usuario por ID
        const usuario = await traerDatosUsuarioPorID(id);
        //? Inicio Formulario
        const form = crearForm();
        //? Label (texto)
        const labelDiv = crearDivForm();
        const label = crearLabelForm('', `¿Desea activar el usuario ${usuario[0].nombreUsuario} con ID ${id}?`);
        labelDiv.append(label);
        //? Asignacion final Form
        form.append(labelDiv);
        //? Retorno de HTML
        return form;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Usuario Activar
// #endregion

// #region //* Contenido Usuario Desctivar
//TODO Inicio Contenido Usuario Desactivar
async function contenidoUsuarioDesctivar(id) {
    try {
        //? Se traen datos de usuario por ID
        const usuario = await traerDatosUsuarioPorID(id);
        //? Inicio Formulario
        const form = crearForm();
        //? Label (texto)
        const labelDiv = crearDivForm();
        const label = crearLabelForm('', `¿Desea desactivar el usuario ${usuario[0].nombreUsuario} con ID ${id}?`);
        labelDiv.append(label);
        //? Asignacion final Form
        form.append(labelDiv);
        //? Retorno de HTML
        return form;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Usuario Desactivar
// #endregion

// #region //* Contenido Libro Insertar
//TODO Inicio Contenido Libro Insertar
async function contenidoLibroInsertar() {
    try {
        //? Se traen datos de categorias
        const categorias = await traerDatosCategorias();
        //? Se inicia el form
        const form = crearForm();
        //? Título
        const divTitulo = crearDivForm();
        const labelTitulo = crearLabelForm('tituloLibro', 'Titulo del Libro');
        const inputTitulo = crearInputForm('tituloLibro', 'text', '');
        divTitulo.append(labelTitulo);
        divTitulo.append(inputTitulo);
        form.append(divTitulo);
        //? Autor
        const divAutor = crearDivForm();
        const labelAutor = crearLabelForm('autorLibro', 'Autor');
        const inputAutor = crearInputForm('autorLibro', 'text', '');
        divAutor.append(labelAutor);
        divAutor.append(inputAutor);
        form.append(divAutor);
        //? ISBN
        const divISBN = crearDivForm();
        const labelISBN = crearLabelForm('isbnLibro', 'ISBN');
        const inputISBN = crearInputForm('isbnLibro', 'number', '');
        divISBN.append(labelISBN);
        divISBN.append(inputISBN);
        form.append(divISBN);
        //? CheckBox Libros
        for (let i = 0; i < categorias.length; i++) {
            const divCheckBox = crearDivPersonalizado('', 'form-check', 'text-start');
            const input = crearInputForm('libro' + (i + 1), 'checkbox', categorias[i].idCategoria);
            input.removeAttribute('class');
            input.classList.add('form-check-input');
            input.setAttribute('name', 'opciones');
            const label = crearLabelForm('libro' + (i + 1), categorias[i].nombreCategoria);
            label.removeAttribute('class');
            label.classList.add('form-check-label');
            divCheckBox.append(input);
            divCheckBox.append(label);
            //? Asignacion final Form
            form.append(divCheckBox);
        }
        //? Cantidad
        const divCantidad = crearDivForm();
        const labelCantidad = crearLabelForm('cantidadLibro', 'Cantidad');
        const inputCantidad = crearInputForm('cantidadLibro', 'number', '');
        divCantidad.append(labelCantidad);
        divCantidad.append(inputCantidad);
        form.append(divCantidad);
        //? Asignacion Final

        //? Retorno de HTML
        return form;
    } catch (e) {
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Libro Insertar
// #endregion

// #region //* Contenido Libro Editar
//TODO Inicio Contenido Libro Editar
async function contenidoLibroEditar(idLibro) {
    try {
        //? Obtener datos
        const categorias = await traerDatosCategorias();
        const categoriasSelect = await traerDatosLibrosHasCategoriaPorID(idLibro);
        const libro = await traerDatosLibroPorID(idLibro);
        //? Creacion Form
        const form = crearForm();
        //? Título
        const divTitulo = crearDivForm();
        const labelTitulo = crearLabelForm('tituloLibroEditar', 'Título del Libro');
        const inputTitulo = crearInputForm('tituloLibroEditar', 'text', libro.tituloLibro);
        divTitulo.append(labelTitulo);
        divTitulo.append(inputTitulo);
        form.append(divTitulo);
        //? Autor
        const divAutor = crearDivForm();
        const labelAutor = crearLabelForm('autorLibroEditar', 'Autor');
        const inputAutor = crearInputForm('autorLibroEditar', 'text', libro.autorLibro);
        divAutor.append(labelAutor);
        divAutor.append(inputAutor);
        form.append(divAutor);
        //? ISBN
        const divISBN = crearDivForm();
        const labelISBN = crearLabelForm('isbnLibroEditar', 'ISBN');
        const inputISBN = crearInputForm('isbnLibroEditar', 'number', libro.isbnLibro);
        divISBN.append(labelISBN);
        divISBN.append(inputISBN);
        form.append(divISBN);
        //? CheckBox Libros
        for (let i = 0; i < categorias.length; i++) {
            const divCheckBox = crearDivPersonalizado('', 'form-check', 'text-start');
            const input = crearInputForm('libro' + (i + 1), 'checkbox', categorias[i].idCategoria);
            input.removeAttribute('class');
            input.classList.add('form-check-input');
            input.setAttribute('name', 'opciones');
            for (let j = 0; j < categoriasSelect.length; j++) {
                if (categoriasSelect[j].idCategoria == categorias[i].idCategoria) {
                    input.setAttribute('checked', 'checked');
                    categoriasSelect[j] = '';
                }
            }

            divCheckBox.append(input);
            const label = crearLabelForm('libro' + (i + 1), categorias[i].nombreCategoria);
            label.removeAttribute('class');
            label.classList.add('form-check-label');

            divCheckBox.append(label);
            //? Asignacion final Form
            form.append(divCheckBox);
        }
        //? Cantidad
        const divCantidad = crearDivForm();
        const labelCantidad = crearLabelForm('cantidadLibroEditar', 'Cantidad');
        const inputCantidad = crearInputForm('cantidadLibroEditar', 'number', libro.cantidadLibro);
        divCantidad.append(labelCantidad);
        divCantidad.append(inputCantidad);
        form.append(divCantidad);

        //? Retorno HTML
        return form;
    } catch (e) {
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Libro Editar
// #endregion

// #region //* Contenido Libros Info
//TODO Inicio Contenido Libros Info
async function contenidoLibrosInfo(id) {
    try {
        //? Traer datos de libros por reserva
        const datosPivote = await traerDatosLibrosHasReservasPorID(id);
        //? Div Contenedor
        const contenedorDiv = crearDivPersonalizado('', 'container-fluid', 'border', 'border-2', 'rounded-2', 'text-start');
        for (let i = 0; i < datosPivote.length; i++) {
            const label = crearLabelForm('Libro #' + (i + 1), 'Libro Reservado #' + (i + 1) + ': ' + datosPivote[i].tituloLibro);
            contenedorDiv.append(label);
        }
        return contenedorDiv;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Libros Info
// #endregion

// #region //* Contenido Libro Eliminar
//TODO Inicio Contenido Libro Eliminar
async function contenidoLibroEliminar(id) {
    try {
        //? Traer datos de libros por reserva
        const datos = await traerDatosLibroPorID(id);
        //? Texto
        const p = crearParrafo(`Estas a punto de eliminar el libro: ${datos.tituloLibro}, Estas seguro de esta accion?`);
        return p;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Libro Eliminar
// #endregion

// #region //* Contenido Libro Activar
//TODO Inicio Contenido Libro Activar
async function contenidoLibroActivar(id) {
    try {
        //? Traer datos de libros por reserva
        const datos = await traerDatosLibroPorID(id);
        //? Texto
        const p = crearParrafo(`Estas a punto de activar el libro: ${datos.tituloLibro}, Estas seguro de esta accion?`);
        return p;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Libro Activar
// #endregion

// #region //* Contenido Libro Ver Categorias por ID
//TODO Inicio Contenido Reserva Ver Libros
async function contenidoLibroVerCategoria(id) {
    try {
        const datos = await traerDatosLibrosHasCategoriaPorID(id);
        const div = crearDivPersonalizado('', 'border', 'rounded', 'p-2', 'mt-2', 'bg-light', 'text-start');
        datos.forEach((element) => {
            const li = crearLi(element.nombreCategoria);
            div.append(li);
        });
        return div;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Reserva Ver Libros
// #endregion

// #region //* Contenido Configuracion Perfil
//TODO Inicio Contenido Configuracion Perfil
async function contenidoConfiguracionPerfil(id) {
    try {
        //? Se traen datos de usuario por ID
        const usuario = await traerDatosUsuarioPorID(id);
        //? Inicio Formulario
        const form = crearForm();
        //? Nombre
        const nombreDiv = crearDivForm();
        const nombreLabel = crearLabelForm('nombreUsuarioPerfil', 'Nombre:');
        const nombreInput = crearInputForm('nombreUsuarioPerfil', 'text', usuario[0].nombreUsuario);
        nombreDiv.append(nombreLabel);
        nombreDiv.append(nombreInput);
        //? Apellido
        const apellidoDiv = crearDivForm();
        const apellidoLabel = crearLabelForm('apellidoUsuarioPerfil', 'Apellido:');
        const apellidoInput = crearInputForm('apellidoUsuarioPerfil', 'text', usuario[0].apellidoUsuario);
        apellidoDiv.append(apellidoLabel);
        apellidoDiv.append(apellidoInput);
        //? Email
        const emailDiv = crearDivForm();
        const emailLabel = crearLabelForm('emailUsuarioPerfil', 'Email:');
        const emailInput = crearInputForm('emailUsuarioPerfil', 'email', usuario[0].emailUsuario);
        emailDiv.append(emailLabel);
        emailDiv.append(emailInput);
        //? Password
        const passDiv = crearDivForm();
        const passLabel = crearLabelForm('passUsuarioPerfil', 'Contraseña:');
        const passInput = crearInputForm('passUsuarioPerfil', 'password', '');
        passDiv.append(passLabel);
        passDiv.append(passInput);
        //? Asignacion final Form
        form.append(nombreDiv);
        form.append(apellidoDiv);
        form.append(emailDiv);
        form.append(passDiv);
        //? Retorno de HTML
        return form;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Configuracion Perfil
// #endregion

// #region //* Contenido Politica & Privacidad
//TODO Inicio Contenido Politica Privacidad
async function contenidoPoliticaPrivacidad() {
    try {
        //? Texto a mostrar
        const text = `
        En BibliotecaADSO, respetamos tu privacidad.
        Los datos personales que puedas proporcionar (como nombre o correo electrónico) se usarán únicamente para responder consultas o mejorar el servicio.
        Usamos cookies solo para fines estadísticos y de personalización.
        No compartimos tu información con terceros.
        Puedes solicitar en cualquier momento la eliminación o modificación de tus datos escribiendo a contacto@bibliotecaadso.com
        Última actualización: 28 de octubre de 2025.
        `;
        //? Inicio Formulario
        const form = crearForm();
        //? Parrafo (texto)
        const parrafoDiv = crearDivForm();
        const parrafo = crearParrafo(text);
        parrafoDiv.append(parrafo);
        //? Asignacion final Form
        form.append(parrafoDiv);
        //? Retorno de HTML
        return form;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Politica Privacidad
// #endregion

// #region //* Contenido Terminos & Condiciones
//TODO Inicio Contenido Terminos & Condiciones
async function contenidoTerminosCondiciones() {
    try {
        //? Texto a mostrar
        const text = `El acceso y uso de BibliotecaADSO implica la aceptación de estos términos. 
        El contenido de esta página es únicamente con fines informativos y educativos.
        No se permite la reproducción o distribución del material sin autorización del autor o fuente original.
        No garantizamos la disponibilidad continua del sitio ni nos hacemos responsables por el uso indebido del contenido.
        Estos términos pueden modificarse sin previo aviso.
        Ley aplicable: Colombia`;
        //? Inicio Formulario
        const form = crearForm();
        //? Parrafo (texto)
        const parrafoDiv = crearDivForm();
        const parrafo = crearParrafo(text);
        parrafoDiv.append(parrafo);
        //? Asignacion final Form
        form.append(parrafoDiv);
        //? Retorno de HTML
        return form;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Terminos & Condiciones
// #endregion

// #region //* Contenido Reserva Libros
//TODO Inicio Contenido Reserva
async function contenidoReservaLibros() {
    try {
        //? Se traen todos los tipos de usuario disponibles
        const libros = await traerDatosLibros();
        //? Inicio Formulario
        const form = crearForm();
        //? CheckBox Libros
        for (let i = 0; i < libros.length; i++) {
            if (libros[i].disponibilidadLibro != 'Desactivado') {
                if (libros[i].cantidadLibro > 0) {
                    const divCheckBox = crearDivPersonalizado('', 'form-check', 'text-start');
                    const input = crearInputForm('libro' + (i + 1), 'checkbox', libros[i].idLibro);
                    input.removeAttribute('class');
                    input.classList.add('form-check-input');
                    input.setAttribute('name', 'opciones');
                    const label = crearLabelForm('libro' + (i + 1), libros[i].tituloLibro);
                    label.removeAttribute('class');
                    label.classList.add('form-check-label');
                    divCheckBox.append(input);
                    divCheckBox.append(label);
                    //? Asignacion final Form
                    form.append(divCheckBox);
                } else {
                    const divCheckBox = crearDivPersonalizado('', 'form-check', 'text-start', 'text-secondary');
                    const label = crearLabelForm('null', libros[i].tituloLibro + ' (Agotado / No disponible)');
                    label.removeAttribute('class');
                    label.classList.add('form-check-label');
                    divCheckBox.append(label);
                    //? Asignacion final Form
                    form.append(divCheckBox);
                }
            }
        }
        //? Retorno de HTML
        return form;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Reserva Libros
// #endregion

// #region //* Contenido Reserva Aprobar
//TODO Inicio Contenido Aprobar Reserva
async function contenidoAprobarReserva(id) {
    try {
        //? Inicio Formulario
        const form = crearForm();
        //? Label
        const divLabel = crearDivForm();
        const label = crearLabelForm('', '¿Esta seguro de aprobar la reserva #' + id + '?');
        divLabel.append(label);
        //? Asignacion final Form
        form.append(divLabel);
        //? Retorno de HTML
        return form;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Cancelar Reserva
// #endregion

// #region //* Contenido Reserva Cancelar
//TODO Inicio Contenido Cancelar Reserva
async function contenidoCancelarReserva(id) {
    try {
        //? Inicio Formulario
        const form = crearForm();
        //? Label
        const divLabel = crearDivForm();
        const label = crearLabelForm('', '¿Esta seguro de cancelar la reserva #' + id + '?');
        divLabel.append(label);
        //? Asignacion final Form
        form.append(divLabel);
        //? Retorno de HTML
        return form;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Cancelar Reserva
// #endregion

// #region //* Contenido Reserva Ver Libros
//TODO Inicio Contenido Reserva Ver Libros
async function contenidoReservaVerLibros(id) {
    try {
        const datos = await traerDatosLibrosHasReservasPorID(id);
        const div = crearDivPersonalizado('', 'border', 'rounded', 'p-2', 'mt-2', 'bg-light', 'text-start');
        datos.forEach((element) => {
            const li = crearLi(element.tituloLibro);
            div.append(li);
        });
        return div;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Reserva Ver Libros
// #endregion

// #region //* Contenido Archivos Generar
//TODO Inicio Contenido Generar Archivo
async function contenidoGenerarArchivos() {
    try {
        //? Inicio de formulario
        const form = crearForm();
        //? Select para definir que tipo de archivo se va a generar
        const divTipoArchivo = crearDivForm();
        const selectTipoArchivo = crearSelectForm('selectTipoArchivo');
        //* Opciones de generacion de archivo
        //? Opcion Default
        const opcionGenerarDefault = crearOptionForm('', 'Seleccione el tipo de Archivo', true);
        selectTipoArchivo.append(opcionGenerarDefault);
        //? Opcion generar Excel
        const opcionGenerarExcel = crearOptionForm('Excel', 'Generar Excel', false);
        selectTipoArchivo.append(opcionGenerarExcel);
        //? Opcion generar PDF
        const opcionGenerarPDF = crearOptionForm('PDF', 'Generar PDF', false);
        selectTipoArchivo.append(opcionGenerarPDF);
        //! //////////////////////////////////////////////////////////////////////
        //? Select opciones de generacion
        const divTipoGeneracion = crearDivPersonalizado('divTipoGeneracion', 'mb-3');
        const selectTipoGeneracion = crearSelectForm('selectTipoGeneracion');
        //* Opcion Default
        const opcionGeneracionDefault = crearOptionForm('Default', 'Seleccione un tipo de generacion', false);
        selectTipoGeneracion.append(opcionGeneracionDefault);
        //! //////////////////////////////////////////////////////////////////////
        //* Fechas
        //? Fecha Inicio
        const divFechaInicio = crearDivForm();
        const labelFechaInicio = crearLabelForm('fechaInicio', 'Fecha inicial');
        const inputFechaInicio = crearInputForm('fechaInicio', 'date', '');
        //? Fecha Fin
        const divFechaFin = crearDivForm();
        const labelFechaFin = crearLabelForm('fechaFin', 'Fecha final');
        const inputFechaFin = crearInputForm('fechaFin', 'date', '');
        //? Asignacion final
        //* Tipo Archivo
        divTipoArchivo.append(selectTipoArchivo);
        //* Tipo Generacion
        divTipoGeneracion.append(selectTipoGeneracion);
        //* Fecha Inicio
        divFechaInicio.append(labelFechaInicio);
        divFechaInicio.append(inputFechaInicio);
        //* Fecha Fin
        divFechaFin.append(labelFechaFin);
        divFechaFin.append(inputFechaFin);
        //* Asignacion a Form
        form.append(divTipoArchivo);
        form.append(divTipoGeneracion);
        form.append(divFechaInicio);
        form.append(divFechaFin);
        //? Retorno HTML
        return form;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Inicio Contenido Generar Archivo Excel
// #endregion

// #region //* Contenido Prestamo Registrar
//TODO Inicio Contenido Prestamo Registrar desde Reservas Aprobadas
async function contenidoRegistrarPrestamo() {
    try {
        const reservasAprobadas = await traerDatosReservasAprobadas();
        const contenedorDiv = crearDivPersonalizado('', 'container-fluid');
        if (reservasAprobadas.length === 0) {
            const mensaje = crearParrafo('No hay reservas aprobadas disponibles para registrar préstamos.');
            contenedorDiv.append(mensaje);
            return contenedorDiv;
        }
        const table = document.createElement('table');
        table.classList.add('table', 'table-striped', 'table-hover');
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headers = ['ID Reserva', 'Cliente', 'Email', 'Fecha Reserva', 'Acción'];
        headers.forEach((headerText) => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.append(th);
        });
        thead.append(headerRow);
        table.append(thead);
        const tbody = document.createElement('tbody');
        reservasAprobadas.forEach((reserva) => {
            const row = document.createElement('tr');
            const tdId = document.createElement('td');
            tdId.textContent = reserva.idReserva;
            row.append(tdId);
            const tdCliente = document.createElement('td');
            tdCliente.textContent = reserva.nombreUsuario + ' ' + reserva.apellidoUsuario;
            row.append(tdCliente);
            const tdEmail = document.createElement('td');
            tdEmail.textContent = reserva.emailUsuario;
            row.append(tdEmail);
            const tdFecha = document.createElement('td');
            tdFecha.textContent = reserva.fechaReserva;
            row.append(tdFecha);
            const tdAccion = document.createElement('td');
            const btnRegistrar = document.createElement('button');
            btnRegistrar.classList.add('btn', 'btn-success', 'btn-sm');
            btnRegistrar.innerHTML = '<i class="bi bi-check-circle"></i> Registrar';
            btnRegistrar.onclick = () => sweetPrestamoConfirmarRegistro(reserva.idReserva);
            const buttonDetalle = crearButton('button', '');
            buttonDetalle.classList.add('btn', 'btn-info', 'btn-sm', 'ms-2', 'text-white');
            buttonDetalle.innerHTML = '<i class="bi bi-eye"></i> Detalles';
            buttonDetalle.addEventListener('click', () => {
                sweetReservaVerLibros(reserva.idReserva);
            });
            tdAccion.append(btnRegistrar);
            tdAccion.append(buttonDetalle);
            row.append(tdAccion);
            tbody.append(row);
        });
        table.append(tbody);
        contenedorDiv.append(table);
        return contenedorDiv;
    } catch (e) {
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Prestamo Registrar
// #endregion

// #region //* Contenido Prestamo Enviar Correo
// TODO Inicio Contenido Prestamo Enviar Correo
async function contenidoPrestamoEnviarCorreo(datosPrestamo) {
    try {
        const contenedorDiv = crearDivPersonalizado('', 'container-fluid', 'text-start');
        const titulo = document.createElement('h5');
        titulo.classList.add('mb-3');
        titulo.textContent = 'Información del Préstamo:';
        contenedorDiv.append(titulo);
        const infoPrestamo = document.createElement('div');
        infoPrestamo.classList.add('border', 'rounded', 'p-3', 'bg-light');
        infoPrestamo.innerHTML = `
            <p><strong>Número de Préstamo:</strong> #${datosPrestamo.idPrestamo}</p>
            <p><strong>Cliente:</strong> ${datosPrestamo.nombreUsuario} ${datosPrestamo.apellidoUsuario}</p>
            <p><strong>Email:</strong> ${datosPrestamo.emailUsuario}</p>
            <p><strong>Fecha de Préstamo:</strong> ${datosPrestamo.fechaPrestamo}</p>
            <p><strong>Fecha de Devolución:</strong> ${datosPrestamo.fechaDevolucion}</p>
            <p><strong>Libros:</strong><br>${datosPrestamo.libros}</p>
        `;
        contenedorDiv.append(infoPrestamo);
        const mensaje = document.createElement('p');
        mensaje.classList.add('mt-3', 'text-info');
        mensaje.innerHTML = '<i class="bi bi-envelope"></i> ¿Desea enviar un correo de notificación al cliente?';
        contenedorDiv.append(mensaje);
        return contenedorDiv;
    } catch (e) {
        console.log(e);
        return false;
    }
}
// TODO Fin Contenido Prestamo Enviar Correo
// #endregion

// #region //* Contenido Alertas Error
//TODO Inicio Contenido Alertas Error
async function contenidoAlertasError(message) {
    try {
        //? Texto
        const div = crearDivForm();
        const p = crearParrafo(message);
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

//! /////////////////////////////////////////////////////////
//! FIN Contenidos de HTML para los SweetAlert
//! /////////////////////////////////////////////////////////

// #endregion

// #region //* Funciones SweetAlert Main
//! /////////////////////////////////////////////////////////
//! Funciones SweetAlert (SweetAlert2 Principales)
//! /////////////////////////////////////////////////////////

// #region //* Sweet Usuario Insertar
//TODO Inicio SweetAlert Usuario Insertar
async function sweetUsuarioInsertar() {
    try {
        Swal.fire({
            title: 'Crear Nuevo Usuario', //? Titulo Modal
            showLoaderOnConfirm: true, //? Muestra loader mientras espera el preConfirm
            html: await contenidoUsuarioInsertar(), //? Contenido HTML
            confirmButtonText: 'Confirmar', //? Texto boton confirmar
            showCancelButton: true, //? Mostrar boton cancelar
            cancelButtonText: 'Cancelar', //? Texto boton cancelar
            focusConfirm: false, //? Desactivar focus al boton confirmar
            confirmButtonColor: '#007bff', //? Color boton confirmar
            cancelButtonColor: '#dc3545', //? Color boton cancelar
            preConfirm: async () => {
                //? Se capturan los datos del formulario
                const nombre = document.querySelector('#nombreUsuario').value.trim();
                const apellido = document.querySelector('#apellidoUsuario').value.trim();
                const email = document.querySelector('#emailUsuario').value.trim();
                //* Validar formato de correo antes de continuar
                const emailValue = email;
                const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!regexCorreo.test(emailValue)) {
                    Swal.showValidationMessage('Formato de correo no válido');
                    return false;
                }
                const pass = document.querySelector('#passUsuario').value.trim();
                const tipoUsuario = document.querySelector('#tipoUsuario').value.trim();
                //? Verificar que los campos esten llenos
                if (!nombre || !apellido || !email || !pass || !tipoUsuario) {
                    Swal.showValidationMessage('¡Todos los campos son requeridos!');
                    return false;
                }
                //? Verificacion de Email del Usuario
                let boolEmail = await verificarEmail(email);
                if (boolEmail == false) {
                    Swal.showValidationMessage('¡Email ya existente, intenta con otro email!');
                    return false;
                }
                //? Retornar valores finales
                return {
                    nombre,
                    apellido,
                    email,
                    pass,
                    tipoUsuario,
                };
            },
        }).then(async (result) => {
            //? Verificar click en boton confirmar
            if (result.isConfirmed) {
                //? Traer datos retornados del preConfirm
                const datos = result.value;
                //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
                let formData = new FormData();
                formData.append('nombre', datos.nombre);
                formData.append('apellido', datos.apellido);
                formData.append('email', datos.email);
                formData.append('pass', datos.pass);
                formData.append('tipoUsuario', datos.tipoUsuario);
                //? Solicitud de datos a controller
                const json = await fetch('../controller/controllerUsuarioInsertar.php', {
                    method: 'POST',
                    body: formData,
                });
                //? Conversion a JSON valido
                const response = await json.json();
                //? Verificacion de proceso (success = True: Exito, success = False: Error)
                if (response.success) {
                    Swal.fire({ title: '¡Éxito!', text: response.message, icon: 'success', confirmButtonColor: '#007bff' }).then(
                        () => {
                            location.reload();
                        },
                    );
                } else {
                    Swal.fire({ title: '¡Error!', text: response.message, icon: 'error', confirmButtonColor: '#007bff' }).then(
                        () => {
                            location.reload();
                        },
                    );
                }
            }
        });
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin SweetAlert Usuario Insertar
// #endregion

// #region //* Sweet Usuario Editar
//TODO Inicio SweetAlert Usuario Editar
async function sweetUsuarioEditar(id) {
    try {
        Swal.fire({
            title: 'Editar Usuario', //? Titulo Modal
            showLoaderOnConfirm: true, //? muestra loader mientras espera el preConfirm
            html: await contenidoUsuarioEditar(id), //? Contenido HTML
            confirmButtonText: 'Confirmar', //? Texto boton confirmar
            showCancelButton: true, //? Mostrar boton cancelar
            cancelButtonText: 'Cancelar', //? Texto boton cancelar
            focusConfirm: false, //? Desactivar focus al boton crear
            confirmButtonColor: '#007bff', //? Color boton confirmar
            cancelButtonColor: '#dc3545', //? Color boton cancelar
            preConfirm: async () => {
                //? Se traen datos de usuario por ID
                const datosUsuario = await traerDatosUsuarioPorID(id);
                //? Se capturan los datos del formulario
                const nombre = document.querySelector('#nombreUsuario').value.trim();
                const apellido = document.querySelector('#apellidoUsuario').value.trim();
                const email = document.querySelector('#emailUsuario').value.trim();
                //* Validar formato de correo antes de continuar
                const emailValue = email;
                const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!regexCorreo.test(emailValue)) {
                    Swal.showValidationMessage('Formato de correo no válido');
                    return false;
                }
                let pass = document.querySelector('#passUsuario').value.trim();
                const tipoUsuario = document.querySelector('#tipoUsuario').value.trim();
                //? Se verifica si se escribio una password nueva o se dejo vacio
                let bool = false;
                if (pass == null || pass == '') {
                    //? Si se dejo vacio se asigna la contraseña anterior
                    pass = datosUsuario[0].passUsuario;
                    bool = true;
                }
                //? Verificar que los campos esten llenos
                if (!nombre || !apellido || !email || !pass || !tipoUsuario) {
                    Swal.showValidationMessage('¡Todos los campos son requeridos!');
                    return false;
                }
                //? Verificacion de Email del Usuario
                if (email != datosUsuario[0].emailUsuario) {
                    let boolEmail = await verificarEmail(email);
                    if (boolEmail == false) {
                        Swal.showValidationMessage('¡Email ya existente, intenta con otro email!');
                        return false;
                    }
                }
                //? Retornar valores finales
                return {
                    nombre,
                    apellido,
                    email,
                    pass,
                    tipoUsuario,
                    bool,
                    id,
                };
            },
        }).then(async (result) => {
            //? Verificar click en boton confirmar
            if (result.isConfirmed) {
                //? Traer datos retornados del preConfirm
                const datos = result.value;
                //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
                let formData = new FormData();
                formData.append('nombre', datos.nombre);
                formData.append('apellido', datos.apellido);
                formData.append('email', datos.email);
                formData.append('pass', datos.pass);
                formData.append('tipoUsuario', datos.tipoUsuario);
                formData.append('bool', datos.bool);
                formData.append('id', datos.id);
                //? Solicitud de datos a controller
                const json = await fetch('../controller/controllerUsuarioEditar.php', {
                    method: 'POST',
                    body: formData,
                });
                //? Conversion a JSON valido
                const response = await json.json();
                //? Verificacion de proceso (success = True: Exito, success = False: Error)
                if (response.success) {
                    Swal.fire({ title: '¡Éxito!', text: response.message, icon: 'success', confirmButtonColor: '#007bff' }).then(
                        () => {
                            location.reload();
                        },
                    );
                } else {
                    Swal.fire({ title: '¡Error!', text: response.message, icon: 'error', confirmButtonColor: '#007bff' }).then(
                        () => {
                            location.reload();
                        },
                    );
                }
            }
        });
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin SweetAlert Usuario Editar
// #endregion

// #region //* Sweet Usuario Activar
//TODO Inicio SweetAlert Activar Usuario
async function sweetUsuarioActivar(id) {
    try {
        Swal.fire({
            title: 'Activar Usuario', //? Titulo Modal
            icon: 'question', //? Icono Modal
            showLoaderOnConfirm: true, //? muestra loader mientras espera el preConfirm
            html: await contenidoUsuarioActivar(id), //? Contenido HTML
            confirmButtonText: 'Confirmar', //? Texto boton confirmar
            showCancelButton: true, //? Mostrar boton cancelar
            cancelButtonText: 'Cancelar', //? Texto boton cancelar
            focusConfirm: false, //? Desactivar focus al boton crear
            confirmButtonColor: '#007bff', //? Color boton confirmar
            cancelButtonColor: '#dc3545', //? Color boton cancelar
            preConfirm: () => {
                //? Retornar valores finales
                return id;
            },
        }).then(async (result) => {
            //? Verificar click en boton confirmar
            if (result.isConfirmed) {
                //? Traer datos retornados del preConfirm
                const datos = result.value;
                //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
                let formData = new FormData();
                formData.append('id', datos);
                //? Solicitud de datos a controller
                const json = await fetch('../controller/controllerUsuarioActivar.php', {
                    method: 'POST',
                    body: formData,
                });
                //? Conversion a JSON valido
                const response = await json.json();
                //? Verificacion de proceso (success = True: Exito, success = False: Error)
                if (response.success) {
                    Swal.fire({ title: '¡Éxito!', text: response.message, icon: 'success', confirmButtonColor: '#007bff' }).then(
                        () => {
                            location.reload();
                        },
                    );
                } else {
                    Swal.fire({ title: '¡Error!', text: response.message, icon: 'error', confirmButtonColor: '#007bff' }).then(
                        () => {
                            location.reload();
                        },
                    );
                }
            }
        });
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin SweetAlert Activar Usuario
// #endregion

// #region //* Sweet Usuario Desactivar
//TODO Inicio SweetAlert Desactivar Usuario
async function sweetUsuarioDesactivar(id) {
    try {
        Swal.fire({
            title: 'Desactivar Usuario', //? Titulo Modal
            icon: 'warning', //? Icono Modal
            showLoaderOnConfirm: true, //? muestra loader mientras espera el preConfirm
            html: await contenidoUsuarioDesctivar(id), //? Contenido HTML
            confirmButtonText: 'Confirmar', //? Texto boton confirmar
            showCancelButton: true, //? Mostrar boton cancelar
            cancelButtonText: 'Cancelar', //? Texto boton cancelar
            focusConfirm: false, //? Desactivar focus al boton crear
            confirmButtonColor: '#007bff', //? Color boton confirmar
            cancelButtonColor: '#dc3545', //? Color boton cancelar
            preConfirm: () => {
                //? Retornar valores finales
                return id;
            },
        }).then(async (result) => {
            //? Verificar click en boton confirmar
            if (result.isConfirmed) {
                //? Traer datos retornados del preConfirm
                const datos = result.value;
                //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
                let formData = new FormData();
                formData.append('id', datos);
                //? Solicitud de datos a controller
                const json = await fetch('../controller/controllerUsuarioDesactivar.php', {
                    method: 'POST',
                    body: formData,
                });
                //? Conversion a JSON valido
                const response = await json.json();
                //? Verificacion de proceso (success = True: Exito, success = False: Error)
                if (response.success) {
                    Swal.fire({ title: '¡Éxito!', text: response.message, icon: 'success', confirmButtonColor: '#007bff' }).then(
                        () => {
                            location.reload();
                        },
                    );
                } else {
                    Swal.fire({ title: '¡Error!', text: response.message, icon: 'error', confirmButtonColor: '#007bff' }).then(
                        () => {
                            location.reload();
                        },
                    );
                }
            }
        });
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin SweetAlert Desactivar Usuario
// #endregion

// #region //* Sweet Configuracion Perfil
//TODO Inicio SweetAlert Editar Perfil
async function sweetConfiguracionPerfil(id) {
    try {
        Swal.fire({
            title: 'Editar Perfil', //? Titulo Modal
            showLoaderOnConfirm: true, //? muestra loader mientras espera el preConfirm
            html: await contenidoConfiguracionPerfil(id), //? Contenido HTML
            confirmButtonText: 'Confirmar', //? Texto boton confirmar
            showCancelButton: true, //? Mostrar boton cancelar
            cancelButtonText: 'Cancelar', //? Texto boton cancelar
            focusConfirm: false, //? Desactivar focus al boton crear
            confirmButtonColor: '#007bff', //? Color boton confirmar
            cancelButtonColor: '#dc3545', //? Color boton cancelar
            preConfirm: async () => {
                //? Se traen datos de usuario por ID
                const datosUsuario = await traerDatosUsuarioPorID(id);
                //? Se capturan los datos del formulario
                const nombre = document.querySelector('#nombreUsuarioPerfil').value.trim();
                const apellido = document.querySelector('#apellidoUsuarioPerfil').value.trim();
                const email = document.querySelector('#emailUsuarioPerfil').value.trim();
                let pass = document.querySelector('#passUsuarioPerfil').value.trim();
                //? Se verifica si se escribio una password nueva o se dejo vacio
                let bool = false;
                if (pass == null || pass == '') {
                    //? Si se dejo vacio se asigna la contraseña anterior
                    pass = datosUsuario[0].passUsuario;
                    bool = true;
                }
                //? Verificar que los campos esten llenos
                if (!nombre || !apellido || !email || !pass) {
                    Swal.showValidationMessage('¡Todos los campos son requeridos!');
                    return false;
                }
                //? Verificacion de Email del Usuario
                if (email != datosUsuario[0].emailUsuario) {
                    let boolEmail = await verificarEmail(email);
                    if (boolEmail == false) {
                        Swal.showValidationMessage('¡Email ya existente, intenta con otro email!');
                        return false;
                    }
                }
                //? Retornar valores finales
                return {
                    nombre,
                    apellido,
                    email,
                    pass,
                    bool,
                    id,
                };
            },
        }).then(async (result) => {
            //? Verificar click en boton confirmar
            if (result.isConfirmed) {
                //? Traer datos retornados del preConfirm
                const datos = result.value;
                //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
                let formData = new FormData();
                formData.append('nombre', datos.nombre);
                formData.append('apellido', datos.apellido);
                formData.append('email', datos.email);
                formData.append('pass', datos.pass);
                formData.append('bool', datos.bool);
                formData.append('id', datos.id);
                //? Solicitud de datos a controller
                const json = await fetch('../controller/controllerUsuarioEditarPerfil.php', {
                    method: 'POST',
                    body: formData,
                });
                //? Conversion a JSON valido
                const response = await json.json();
                //? Verificacion de proceso (success = True: Exito, success = False: Error)
                if (response.success) {
                    Swal.fire({ title: '¡Éxito!', text: response.message, icon: 'success', confirmButtonColor: '#007bff' }).then(
                        () => {
                            location.reload();
                        },
                    );
                } else {
                    Swal.fire({ title: '¡Error!', text: response.message, icon: 'error', confirmButtonColor: '#007bff' }).then(
                        () => {
                            location.reload();
                        },
                    );
                }
            }
        });
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin SweetAlert Editar Perfil
// #endregion

// #region //* Sweet Politica & Privacidad
//TODO Inicio SweetAlert Activar Usuario
async function sweetPoliticaPrivacidad() {
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
async function sweetTerminosCondiciones() {
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

// #region //* Sweet Libros Info
//TODO Inicio SweetAlert Libros Info
async function sweetLibrosInfo(id) {
    try {
        Swal.fire({
            title: 'Listado de libros', //? Titulo Modal
            showLoaderOnConfirm: true, //? muestra loader mientras espera el preConfirm
            html: await contenidoLibrosInfo(id), //? Contenido HTML
            confirmButtonText: 'Aceptar', //? Texto boton confirmar
            focusConfirm: false, //? Desactivar focus al boton crear
            confirmButtonColor: '#007bff', //? Color boton confirmar
            cancelButtonColor: '#dc3545', //? Color boton cancelar
        });
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin SweetAlert Libros Info
// #endregion

// #region //* Sweet Libro Insertar
//TODO SweetAlert Insertar Libro
async function sweetLibroInsertar() {
    Swal.fire({
        title: 'Agregar Nuevo Libro',
        showLoaderOnConfirm: true,
        html: await contenidoLibroInsertar(),
        confirmButtonText: 'Guardar Libro',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        focusConfirm: false,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#dc3545',
        width: '600px',
        preConfirm: async () => {
            const titulo = document.querySelector('#tituloLibro');
            const autor = document.querySelector('#autorLibro');
            const isbn = document.querySelector('#isbnLibro');
            //? Se capturan todos los input con 'name: "opciones"', y se filtran los checked
            const opciones = document.querySelectorAll('input[name="opciones"]:checked');
            const cantidad = document.querySelector('#cantidadLibro');
            // validar campos requeridos
            if (!titulo || !titulo.value || titulo.value.trim() === '') {
                console.log('Error en título');
                Swal.showValidationMessage('¡El título es requerido!');
                return false;
            }
            if (!autor || !autor.value || autor.value.trim() === '') {
                console.log('Error en autor');
                Swal.showValidationMessage('¡El autor es requerido!');
                return false;
            }
            if (!cantidad || !cantidad.value || cantidad.value < 0) {
                console.log('Error en cantidad');
                Swal.showValidationMessage('¡La cantidad debe ser mayor o igual a 0!');
                return false;
            }
            // verificar si el ISBN ya existe
            if (isbn && isbn.value && isbn.value.trim() !== '') {
                let boolISBN = await verificarISBN(isbn.value);
                if (boolISBN === false) {
                    Swal.showValidationMessage('¡ISBN ya existente, intenta con otro ISBN!');
                    return false;
                }
            }

            return {
                tituloLibro: titulo.value,
                autorLibro: autor.value,
                isbnLibro: isbn.value || '',
                cantidadLibro: cantidad.value,
                opciones: opciones,
            };
        },
    }).then(async (result) => {
        if (result.isConfirmed) {
            const datos = result.value;
            try {
                //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
                let formData = new FormData();
                formData.append('tituloLibro', datos.tituloLibro);
                formData.append('autorLibro', datos.autorLibro);
                formData.append('isbnLibro', datos.isbnLibro);
                formData.append('cantidadLibro', datos.cantidadLibro);
                //? Se hace la peticion al controller
                const json = await fetch('../controller/controllerLibroInsertar.php', {
                    method: 'POST',
                    body: formData,
                });
                const response = await json.json();
                if (response.success == false) {
                    Swal.fire({
                        title: '¡Éxito!',
                        text: response.message || 'Libro agregado correctamente',
                        icon: 'success',
                        confirmButtonColor: '#28a745',
                    }).then(() => {
                        location.reload();
                    });
                }
                //? Se extrae id ingresado anteriormente
                let idLibro = await traerDatosUltimoLibro();
                //* Se inserta la reserva en la tabla pivote (con ciclo para cada libro)
                for (let i = 0; i < datos.opciones.length; i++) {
                    //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
                    let formDataPivote = new FormData();
                    formDataPivote.append('idCategoria', datos.opciones[i].value);
                    formDataPivote.append('idLibro', idLibro);
                    //? Solicitud de datos a controller
                    const jsonPivote = await fetch('../controller/controllerLibroHasCategoriaInsertar.php', {
                        method: 'POST',
                        body: formDataPivote,
                    });
                    console.log('hola');

                    //? Conversion a JSON valido
                    let responsePivote = await jsonPivote.json();
                    console.log('hola1');
                    //? Verificacion de proceso (success = True: Exito, success = False: Error)
                    if (responsePivote.success == false) {
                        Swal.fire({
                            title: '¡Error!',
                            text: responsePivote.message,
                            icon: 'error',
                            confirmButtonColor: '#007bff',
                        }).then(() => {
                            location.reload();
                        });
                    }
                }
                console.log('hola');
                //? Si todo sale bien se muestra un modal exitoso!
                Swal.fire({
                    title: '¡Éxito!',
                    text: '¡Reserva Realizada con exito!',
                    icon: 'success',
                    confirmButtonColor: '#007bff',
                }).then(() => {
                    location.reload();
                });
            } catch (error) {
                console.error('Error completo:', error);
                Swal.fire({
                    title: '¡Error!',
                    text: error.responseJSON?.message || 'Error al procesar la solicitud',
                    icon: 'error',
                    confirmButtonColor: '#dc3545',
                });
            }
        }
    });
}
//TODO fin SweetAlert insertar Libro
// #endregion

// #region //* Sweet Libro Editar
//TODO SweetAlert Editar Libro
async function sweetLibroEditar(idLibro) {
    Swal.fire({
        title: 'Editar Libro',
        showLoaderOnConfirm: true,
        html: await contenidoLibroEditar(idLibro),
        confirmButtonText: 'Actualizar Libro',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        focusConfirm: false,
        confirmButtonColor: '#ffc107',
        cancelButtonColor: '#dc3545',
        width: '600px',
        preConfirm: async () => {
            const titulo = document.querySelector('#tituloLibroEditar');
            const autor = document.querySelector('#autorLibroEditar');
            const isbn = document.querySelector('#isbnLibroEditar');
            const opciones = document.querySelectorAll('input[name="opciones"]:checked');
            const cantidad = document.querySelector('#cantidadLibroEditar');
            const datos = await traerDatosLibroPorID(idLibro);
            // Validar campos requeridos
            if (!titulo || !titulo.value || titulo.value.trim() === '') {
                Swal.showValidationMessage('¡El título es requerido!');
                return false;
            }
            if (!autor || !autor.value || autor.value.trim() === '') {
                Swal.showValidationMessage('¡El autor es requerido!');
                return false;
            }
            if (!isbn || !isbn.value || isbn.value < 0) {
                Swal.showValidationMessage('¡La cantidad debe ser mayor o igual a 0!');
                return false;
            }
            if (opciones.length == 0) {
                Swal.showValidationMessage('¡Debe seleccionar una categoría!');
                return false;
            }
            if (!cantidad || !cantidad.value || cantidad.value < 0) {
                Swal.showValidationMessage('¡La cantidad debe ser mayor o igual a 0!');
                return false;
            }
            if (datos.isbnLibro != isbn.value) {
                if (isbn && isbn.value && isbn.value.trim() !== '') {
                    // verificar si el ISBN ya existe
                    let boolISBN = await verificarISBN(isbn.value);
                    if (boolISBN === false) {
                        Swal.showValidationMessage('¡ISBN ya existente, intenta con otro ISBN!');
                        return false;
                    }
                }
            }

            return {
                idLibro: idLibro,
                tituloLibro: titulo.value,
                autorLibro: autor.value,
                isbnLibro: isbn.value || '',
                opciones,
                cantidadLibro: cantidad.value,
            };
        },
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const datos = result.value;
                //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
                let formData = new FormData();
                formData.append('idLibro', datos.idLibro);
                formData.append('tituloLibro', datos.tituloLibro);
                formData.append('autorLibro', datos.autorLibro);
                formData.append('isbnLibro', datos.isbnLibro);
                formData.append('cantidadLibro', datos.cantidadLibro);
                const json = await fetch('../controller/controllerLibroActualizar.php', {
                    method: 'POST',
                    body: formData,
                });
                const response = await json.json();
                if (response.success == false) {
                    Swal.fire({
                        title: '¡Error!',
                        text: response.message || 'No se pudo actualizar el libro',
                        icon: 'error',
                        confirmButtonColor: '#dc3545',
                    });
                }
                //? Se extrae id ingresado anteriormente
                let idLibro = datos.idLibro;
                //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
                let formDataPivoteEliminar = new FormData();
                formDataPivoteEliminar.append('idLibro', idLibro);
                //? Solicitud de datos a controller
                const jsonPivoteEliminar = await fetch('../controller/controllerLibroHasCategoriaEliminar.php', {
                    method: 'POST',
                    body: formDataPivoteEliminar,
                });
                //? Conversion a JSON valido
                console.log('primer1');
                let responsePivoteEliminar = await jsonPivoteEliminar.json();
                if (responsePivoteEliminar.success == true) {
                    //* Se inserta la reserva en la tabla pivote (con ciclo para cada libro)
                    for (let i = 0; i < datos.opciones.length; i++) {
                        //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
                        let formDataPivote = new FormData();
                        formDataPivote.append('idCategoria', datos.opciones[i].value);
                        formDataPivote.append('idLibro', idLibro);
                        //? Solicitud de datos a controller
                        const jsonPivote = await fetch('../controller/controllerLibroHasCategoriaActualizar.php', {
                            method: 'POST',
                            body: formDataPivote,
                        });

                        //? Conversion a JSON valido
                        // let raw = await jsonPivote.text();
                        // console.log(raw);
                        let responsePivote = await jsonPivote.json();

                        //? Verificacion de proceso (success = True: Exito, success = False: Error)
                        if (responsePivote.success == false) {
                            Swal.fire({
                                title: '¡Error!',
                                text: responsePivote.message,
                                icon: 'error',
                                confirmButtonColor: '#007bff',
                            }).then(() => {
                                location.reload();
                            });
                        }
                    }
                }

                //? Si todo sale bien se muestra un modal exitoso!
                Swal.fire({
                    title: '¡Éxito!',
                    text: '¡Reserva Realizada con exito!',
                    icon: 'success',
                    confirmButtonColor: '#007bff',
                }).then(() => {
                    location.reload();
                });
            } catch (error) {
                console.error('Error completo:', error);
                console.error(error.stack);
                Swal.fire({
                    title: '¡Error!',
                    text: error.message || 'Error al procesar la solicitud',
                    icon: 'error',
                    confirmButtonColor: '#dc3545',
                });
            }
        }
    });
}
// #endregion

// #region //* Sweet Libro Eliminar
//TODO SweetAlert Eliminar Libro
async function sweetLibroEliminar(idLibro) {
    Swal.fire({
        title: '¿Eliminar este libro?',
        html: await contenidoLibroEliminar(idLibro),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            return {
                idLibro,
            };
        },
    }).then(async (result) => {
        if (result.isConfirmed) {
            const datos = result.value;
            const formData = new FormData();
            formData.append('idLibro', datos.idLibro);
            const json = await fetch('../controller/controllerLibroEliminar.php', {
                method: 'POST',
                body: formData,
            });
            const response = await json.json();
            response.success == true
                ? Swal.fire({
                      title: 'Eliminado',
                      text: 'El libro ha sido eliminado correctamente',
                      icon: 'success',
                      confirmButtonColor: '#28a745',
                  }).then(() => {
                      location.reload();
                  })
                : Swal.fire({
                      title: '¡Error!',
                      text: '¡Error al eliminar el libro!',
                      icon: 'error',
                      confirmButtonColor: '#dc3545',
                  }).then(() => {
                      location.reload();
                  });
        }
    });
}
// #endregion

// #region //* Sweet Libro Activar
//TODO Inicio SweetAlert Libro Activar
async function sweetLibroActivar(idLibro) {
    Swal.fire({
        title: '¿Eliminar este libro?',
        html: await contenidoLibroActivar(idLibro),
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, activar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            return {
                idLibro,
            };
        },
    }).then(async (result) => {
        if (result.isConfirmed) {
            const datos = result.value;
            const formData = new FormData();
            console.log(datos.idLibro);
            formData.append('idLibro', datos.idLibro);
            console.log('s');
            const json = await fetch('../controller/controllerLibroActivar.php', {
                method: 'POST',
                body: formData,
            });
            const response = await json.json();
            response.success == true
                ? Swal.fire({
                      title: 'Exito!',
                      text: 'El libro ha sido Activado correctamente!',
                      icon: 'success',
                      confirmButtonColor: '#28a745',
                  }).then(() => {
                      location.reload();
                  })
                : Swal.fire({
                      title: '¡Error!',
                      text: '¡Error al activar el libro!',
                      icon: 'error',
                      confirmButtonColor: '#dc3545',
                  }).then(() => {
                      location.reload();
                  });
        }
    });
}
//TODO Fin SweetAlert Libro Activar
// #endregion

// #region //* Sweet Libro Ver Categoria
//TODO Inicio Sweet Libro Ver Categoria
async function sweetLibroVerCategoria(id) {
    try {
        Swal.fire({
            title: 'Categorias Del Libro',
            html: await contenidoLibroVerCategoria(id),
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: 'Cerrar',
            cancelButtonColor: '#6c757d',
        });
    } catch (e) {
        console.log(e);
        return false;
    }
}
//TODO Fin Sweet Libro Ver Categoria
// #endregion

// #region //* Sweet Reserva Crear
//TODO Inicio Crear Reserva Libros
async function sweetReservaLibros(id) {
    try {
        Swal.fire({
            title: 'Reservar Libros', //? Titulo Modal
            showLoaderOnConfirm: true, //? Muestra loader mientras espera el preConfirm
            html: await contenidoReservaLibros(), //? Contenido HTML
            confirmButtonText: 'Confirmar', //? Texto boton confirmar
            showCancelButton: true, //? Mostrar boton cancelar
            cancelButtonText: 'Cancelar', //? Texto boton cancelar
            focusConfirm: false, //? Desactivar focus al boton confirmar
            confirmButtonColor: '#007bff', //? Color boton confirmar
            cancelButtonColor: '#dc3545', //? Color boton cancelar
            preConfirm: async () => {
                //? Se capturan todos los input con 'name: "opciones"', y se filtran los checked
                const opciones = document.querySelectorAll('input[name="opciones"]:checked');
                //? Se verifica que se haya seleccionado al menos 1 opcion
                if (opciones.length == 0) {
                    Swal.showValidationMessage('¡Selecciona Un Libro!');
                    return false;
                }
                //? Retornar valores finales
                return {
                    id,
                    opciones,
                };
            },
        }).then(async (result) => {
            //? Verificar click en boton confirmar

            if (result.isConfirmed) {
                //? Traer datos retornados del preConfirm
                let datos = result.value;
                //* Se inserta primero la reserva para poder usarla en tabla Pivote
                //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
                let formDataReserva = new FormData();
                formDataReserva.append('idUsuario', datos.id);
                //? Solicitud de datos a controller
                const jsonReserva = await fetch('../controller/controllerReservaLibrosInsertar.php', {
                    method: 'POST',
                    body: formDataReserva,
                });
                //? Conversion a JSON valido
                const responseReservaInsert = await jsonReserva.json();
                //? Verificacion de proceso (success = True: Exito, success = False: Error)
                if (responseReservaInsert.success == false) {
                    Swal.fire({
                        title: '¡Error!',
                        text: responseReservaInsert.message,
                        icon: 'error',
                        confirmButtonColor: '#007bff',
                    }).then(() => {
                        location.reload();
                    });
                }
                //? Se extrae id ingresado anteriormente
                let idReserva = await traerDatosUltimaReserva();
                //* Se inserta la reserva en la tabla pivote (con ciclo para cada libro)
                for (let i = 0; i < datos.opciones.length; i++) {
                    //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
                    let formDataPivote = new FormData();
                    formDataPivote.append('idLibro', datos.opciones[i].value);
                    formDataPivote.append('idReserva', idReserva);
                    //? Solicitud de datos a controller
                    const jsonPivote = await fetch('../controller/controllerLibroHasReservaInsertar.php', {
                        method: 'POST',
                        body: formDataPivote,
                    });
                    //? Conversion a JSON valido
                    let responsePivote = await jsonPivote.json();
                    //? Verificacion de proceso (success = True: Exito, success = False: Error)
                    if (responsePivote.success == false) {
                        Swal.fire({
                            title: '¡Error!',
                            text: responsePivote.message,
                            icon: 'error',
                            confirmButtonColor: '#007bff',
                        }).then(() => {
                            location.reload();
                        });
                    }
                }
                //? Si todo sale bien se muestra un modal exitoso!
                Swal.fire({
                    title: '¡Éxito!',
                    text: '¡Reserva Realizada con exito!',
                    icon: 'success',
                    confirmButtonColor: '#007bff',
                }).then(() => {
                    location.reload();
                });
            }
        });
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Crear Reserva Libros
// #endregion

// #region //* Sweet Reserva Aproba
//TODO Inicio Sweet Aprobar Reserva
async function sweetAprobarReserva(id) {
    try {
        Swal.fire({
            title: 'Aprobar reserva', //? Titulo Modal
            icon: 'question',
            html: await contenidoAprobarReserva(id), //? Contenido HTML
            confirmButtonText: 'Aceptar', //? Texto boton confirmar
            showCancelButton: true, //? Mostrar boton cancelar
            cancelButtonText: 'Cancelar', //? Texto boton cancelar
            focusConfirm: false, //? Desactivar focus al boton crear
            confirmButtonColor: '#007bff', //? Color boton confirmar
            cancelButtonColor: '#dc3545', //? Color boton cancelar
            preConfirm: async () => {
                return {
                    id,
                };
            },
        }).then(async (result) => {
            try {
                //? Verificar click en boton confirmar
                if (result.isConfirmed) {
                    //? Traer datos retornados del preConfirm
                    const datos = result.value;
                    //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
                    let formData = new FormData();
                    formData.append('idReserva', datos.id);
                    //? Solicitud de datos a controller
                    const json = await fetch('../controller/controllerReservaLibrosAprobar.php', {
                        method: 'POST',
                        body: formData,
                    });
                    //? Conversion a JSON valido
                    const response = await json.json();
                    //? Verificacion de proceso (success = True: Exito, success = False: Error)
                    if (response.success) {
                        Swal.fire({
                            title: '¡Éxito!',
                            text: response.message,
                            icon: 'success',
                            confirmButtonColor: '#007bff',
                        }).then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire({
                            title: '¡Error!',
                            text: response.message,
                            icon: 'error',
                            confirmButtonColor: '#007bff',
                        }).then(() => {
                            location.reload();
                        });
                    }
                }
            } catch (e) {
                console.log(e);
                return false;
            }
        });
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Sweet Aprobar Reserva
// #endregion

// #region //* Sweet Reserva Cancelar
//TODO Inicio Sweet Cancelar Reserva
async function sweetCancelarReserva(id) {
    try {
        Swal.fire({
            title: 'Cancelar reserva', //? Titulo Modal
            icon: 'warning',
            html: await contenidoCancelarReserva(id), //? Contenido HTML
            confirmButtonText: 'Aceptar', //? Texto boton confirmar
            showCancelButton: true, //? Mostrar boton cancelar
            cancelButtonText: 'Cancelar', //? Texto boton cancelar
            focusConfirm: false, //? Desactivar focus al boton crear
            confirmButtonColor: '#007bff', //? Color boton confirmar
            cancelButtonColor: '#dc3545', //? Color boton cancelar
            preConfirm: async () => {
                return {
                    id,
                };
            },
        }).then(async (result) => {
            try {
                //? Verificar click en boton confirmar
                if (result.isConfirmed) {
                    //? Traer datos retornados del preConfirm
                    const datos = result.value;
                    //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
                    let formData = new FormData();
                    formData.append('idReserva', datos.id);
                    //? Solicitud de datos a controller
                    const json = await fetch('../controller/controllerReservaLibrosCancelar.php', {
                        method: 'POST',
                        body: formData,
                    });
                    //? Conversion a JSON valido
                    const response = await json.json();
                    //? Verificacion de proceso (success = True: Exito, success = False: Error)
                    if (response.success) {
                        Swal.fire({
                            title: '¡Éxito!',
                            text: response.message,
                            icon: 'success',
                            confirmButtonColor: '#007bff',
                        }).then(() => {
                            location.reload();
                        });
                    } else {
                        Swal.fire({
                            title: '¡Error!',
                            text: response.message,
                            icon: 'error',
                            confirmButtonColor: '#007bff',
                        }).then(() => {
                            location.reload();
                        });
                    }
                }
            } catch (e) {
                console.log(e);
                return false;
            }
        });
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Sweet Cancelar Reserva
// #endregion

// #region //* Sweet Reserva Ver Libros
//TODO Inicio Sweet Reserva Ver Libros
async function sweetReservaVerLibros(id) {
    try {
        Swal.fire({
            title: 'Libros reservados',
            html: await contenidoReservaVerLibros(id),
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: 'Cerrar',
            cancelButtonColor: '#6c757d',
        });
    } catch (e) {
        console.log(e);
        return false;
    }
}
//TODO Fin Sweet Reserva Ver Libros
// #endregion

// #region //* Sweet Generar Archivos
//TODO Inicio Sweet Generar Archivos
async function sweetGenerarArchivos() {
    try {
        Swal.fire({
            title: 'Generacion de archivos', //? Titulo Modal
            icon: 'question',
            html: await contenidoGenerarArchivos(), //? Contenido HTML
            didOpen: () => {
                //* Seleccion de etiquetas a usar
                const divTipoGeneracion = document.querySelector('#divTipoGeneracion');
                const selectTipoGeneracion = document.querySelector('#selectTipoGeneracion');
                const selectTipoArchivo = document.querySelector('#selectTipoArchivo');
                //* Evento "Change" para seleccionar el tipo de archivo
                selectTipoArchivo.addEventListener('change', (elemento) => {
                    selectTipoGeneracion.innerHTML = '';
                    //* Opcion Default
                    const opcionGeneracionDefault = crearOptionForm('Default', 'Seleccione un tipo de generacion', false);
                    selectTipoGeneracion.append(opcionGeneracionDefault);
                    switch (elemento.target.value) {
                        case 'Excel':
                            //* Opciones de generacion para el archivo excel
                            //? Inventario
                            const opcionGeneracionExcel1 = crearOptionForm('Inventario', '1. Datos de inventario', false);
                            selectTipoGeneracion.append(opcionGeneracionExcel1);
                            //? Prestamos
                            const opcionGeneracionExcel2 = crearOptionForm('Prestamos', '2. Historial de prestamos', false);
                            selectTipoGeneracion.append(opcionGeneracionExcel2);
                            //? Asigancion final Select
                            divTipoGeneracion.append(selectTipoGeneracion);
                            break;
                        case 'PDF':
                            //* Opciones de generacion para el archivo PDF
                            //? Inventario
                            const opcionGeneracionPDF1 = crearOptionForm('Inventario', '1. Datos de inventario', false);
                            selectTipoGeneracion.append(opcionGeneracionPDF1);
                            //? Prestamos
                            const opcionGeneracionPDF2 = crearOptionForm('Prestamos', '2. Historial de prestamos', false);
                            selectTipoGeneracion.append(opcionGeneracionPDF2);
                            //? Reservas
                            const opcionGeneracionPDF3 = crearOptionForm('Reservas', '2. Historial de reservas', false);
                            selectTipoGeneracion.append(opcionGeneracionPDF3);
                            //? Asigancion final Select
                            divTipoGeneracion.append(selectTipoGeneracion);
                            break;
                        default:
                            break;
                    }
                });
                //* Control de input fechas (si se requiere se activa, de lo contrario se desactiva)
                selectTipoGeneracion.addEventListener('change', (elemento) => {
                    const selectTipoArchivo = document.querySelector('#selectTipoArchivo').value.trim();
                    if (selectTipoArchivo == 'Excel') {
                        const fechaInicio = document.querySelector('#fechaInicio');
                        const fechaFin = document.querySelector('#fechaFin');
                        switch (elemento.target.value) {
                            case 'Inventario':
                                fechaFin.setAttribute('disabled', 'disabled');
                                fechaInicio.setAttribute('disabled', 'disabled');
                                break;
                            case 'Prestamos':
                                fechaFin.removeAttribute('disabled');
                                fechaInicio.removeAttribute('disabled');
                                break;
                            default:
                                break;
                        }
                    } else {
                        fechaFin.removeAttribute('disabled');
                        fechaInicio.removeAttribute('disabled');
                    }
                });
            },
            confirmButtonText: 'Generar', //? Texto boton confirmar
            showCancelButton: true, //? Mostrar boton cancelar
            cancelButtonText: 'Cancelar', //? Texto boton cancelar
            focusConfirm: false, //? Desactivar focus al boton crear
            confirmButtonColor: '#007bff', //? Color boton confirmar
            cancelButtonColor: '#dc3545', //? Color boton cancelar
            preConfirm: async () => {
                const tipoArchivo = document.querySelector('#selectTipoArchivo').value.trim();
                const tipoGeneracion = document.querySelector('#selectTipoGeneracion').value.trim();
                const fechaInicio = document.querySelector('#fechaInicio').value.trim();
                const fechaFin = document.querySelector('#fechaFin').value.trim();
                return {
                    tipoArchivo,
                    tipoGeneracion,
                    fechaInicio,
                    fechaFin,
                };
            },
        }).then(async (result) => {
            try {
                //? Verificar click en boton confirmar
                if (result.isConfirmed) {
                    //? Traer datos retornados del preConfirm
                    const datos = result.value;
                    //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
                    let formData = new FormData();
                    formData.append('tipoGeneracion', datos.tipoGeneracion);
                    formData.append('fechaInicio', datos.fechaInicio);
                    formData.append('fechaFin', datos.fechaFin);
                    //* Se filtra el tipo de archivo
                    let json;
                    console.log(datos.tipoArchivo);
                    switch (datos.tipoArchivo) {
                        case 'Excel':
                            //? Solicitud de datos a controller
                            console.log('g');
                            json = await fetch('../controller/controllerGenerarExcel.php', {
                                method: 'POST',
                                body: formData,
                            });
                            console.log('g');
                            break;
                        case 'PDF':
                            //? Solicitud de datos a controller
                            json = await fetch('../controller/controllerGenerarPDF.php', {
                                method: 'POST',
                                body: formData,
                            });
                            break;
                        default:
                            break;
                    }
                    // console.log('g');
                    // console.log(json.text());
                    // return false;
                    const response = await json.json();
                    console.log(response);
                    //? Verificacion de proceso (success = True: Exito, success = False: Error)
                    if (response.success == true) {
                        Swal.fire({
                            title: '¡Éxito!',
                            text: 'Tu archivo excel esta listo para descargar!.',
                            icon: 'success',
                            showCancelButton: true,
                            confirmButtonText: 'Descargar archivo',
                            cancelButtonText: 'Cancelar', //? Texto boton cancelar
                            confirmButtonColor: '#007bff', //? Color boton confirmar
                            cancelButtonColor: '#dc3545', //? Color boton cancelar
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.href = response.url;
                            }
                        });
                    } else {
                        Swal.fire({
                            title: '¡Error!',
                            text: response.message, // + '     ' + response.error, //! En caso de querer ver el error que suelta el try/catch de una consulta
                            icon: 'error',
                            confirmButtonColor: '#007bff',
                        }).then(() => {
                            location.reload();
                        });
                    }
                }
            } catch (e) {
                console.log(e);
                return false;
            }
        });
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Sweet Generar Archivos
// #endregion

// #region //* Sweet Prestamo Registrar
//TODO SweetAlert Modal Registrar Prestamo
async function sweetRegistrarPrestamo() {
    try {
        Swal.fire({
            title: 'Registrar Préstamo',
            html: await contenidoRegistrarPrestamo(),
            width: '900px',
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: 'Cerrar',
            cancelButtonColor: '#6c757d',
        });
    } catch (e) {
        console.log(e);
        return false;
    }
}
//TODO Fin SweetAlert Modal Registrar Prestamo
// #endregion

// #region //* Sweet Prestamo Confirmar Registros
//TODO SweetAlert Confirmar Registro de Prestamo
async function sweetPrestamoConfirmarRegistro(idReserva) {
    try {
        Swal.fire({
            title: '¿Confirmar registro de préstamo?',
            html: `<p>Se registrará el préstamo para la reserva #${idReserva}</p><p>Fecha de devolución: 7 días desde hoy</p>`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#dc3545',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                return { idReserva };
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                const datos = result.value;
                const formData = new FormData();
                formData.append('idReserva', datos.idReserva);
                const json = await fetch('../controller/controllerPrestamoInsertar.php', {
                    method: 'POST',
                    body: formData,
                });
                const response = await json.json();
                if (response.success) {
                    Swal.fire({
                        title: '¡Éxito!',
                        text: response.message,
                        icon: 'success',
                        confirmButtonColor: '#28a745',
                        confirmButtonText: 'Aceptar',
                        showCancelButton: true,
                        cancelButtonText: 'Enviar Notificación por Correo',
                        cancelButtonColor: '#007bff',
                        reverseButtons: true,
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.cancel) {
                            sweetPrestamoEnviarCorreo(response.idPrestamo);
                        } else {
                            location.reload();
                        }
                    });
                } else {
                    Swal.fire({
                        title: '¡Error!',
                        text: response.message,
                        icon: 'error',
                        confirmButtonColor: '#dc3545',
                    });
                }
            }
        });
    } catch (e) {
        console.log(e);
        return false;
    }
}
//TODO Fin SweetAlert Confirmar Registro
// #endregion

// #region //* Sweet Prestamo Enviar Correo
//TODO Inicio Sweet Prestamo Enviar Correo
async function sweetPrestamoEnviarCorreo(idPrestamo) {
    try {
        const datosPrestamo = await traerDatosPrestamoPorID(idPrestamo);
        if (!datosPrestamo) {
            Swal.fire({
                title: '¡Error!',
                text: 'No se pudieron obtener los datos del préstamo',
                icon: 'error',
                confirmButtonColor: '#dc3545',
            });
            return;
        }
        Swal.fire({
            title: 'Enviar Notificación por Correo',
            html: await contenidoPrestamoEnviarCorreo(datosPrestamo),
            width: '700px',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Enviar Correo',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#007bff',
            cancelButtonColor: '#6c757d',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                return { idPrestamo };
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                const datos = result.value;
                const formData = new FormData();
                formData.append('idPrestamo', datos.idPrestamo);
                const json = await fetch('../controller/controllerEnviarCorreoPrestamo.php', {
                    method: 'POST',
                    body: formData,
                });
                const response = await json.json();
                if (response.success) {
                    Swal.fire({
                        title: '¡Éxito!',
                        text: response.message,
                        icon: 'success',
                        confirmButtonColor: '#28a745',
                    }).then(() => {
                        location.reload();
                    });
                } else {
                    Swal.fire({
                        title: '¡Error!',
                        text: response.message,
                        icon: 'error',
                        confirmButtonColor: '#dc3545',
                    }).then(() => {
                        location.reload();
                    });
                }
            } else {
                location.reload();
            }
        });
    } catch (e) {
        console.log(e);
        return false;
    }
}
//TODO Fin Sweet Prestamo Enviar Correo
// #endregion

// #region //* Sweet Prestamo Registrar Devolucion
//TODO Inicio Sweet Prestamo Registrar Devolucion
async function sweetPrestamoRegistrarDevolucion(idPrestamo) {
    try {
        Swal.fire({
            title: '¿Registrar devolución?',
            html: `<p>Se registrará la devolución del préstamo #${idPrestamo}</p><p>El inventario de los libros será actualizado</p>`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, devolver',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#28a745',
            cancelButtonColor: '#6c757d',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                return { idPrestamo };
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                const datos = result.value;
                const formData = new FormData();
                formData.append('idPrestamo', datos.idPrestamo);
                const json = await fetch('../controller/controllerPrestamoDevolver.php', {
                    method: 'POST',
                    body: formData,
                });

                const response = await json.json();

                if (response.success) {
                    Swal.fire({
                        title: '¡Éxito!',
                        text: response.message,
                        icon: 'success',
                        confirmButtonColor: '#28a745',
                    }).then(() => {
                        location.reload();
                    });
                } else {
                    Swal.fire({
                        title: '¡Error!',
                        text: response.message,
                        icon: 'error',
                        confirmButtonColor: '#dc3545',
                    });
                }
            }
        });
    } catch (e) {
        console.log(e);
        Swal.fire({
            title: '¡Error!',
            text: 'Error al procesar la solicitud',
            icon: 'error',
            confirmButtonColor: '#dc3545',
        });
    }
}
//TODO Fin Sweet Prestamo Registrar Devolucion
// #endregion

// #region //* Sweet Prestamo Ver Detalles
//TODO Inicio Sweet Prestamo Ver Detalles
async function sweetPrestamoVerDetalles(idPrestamo) {
    try {
        const datosPrestamo = await traerDatosPrestamoPorID(idPrestamo);
        if (!datosPrestamo) {
            Swal.fire({
                title: '¡Error!',
                text: 'No se pudieron obtener los datos del préstamo',
                icon: 'error',
                confirmButtonColor: '#dc3545',
            });
            return;
        }
        const fechaDevolucionEsperada = new Date(datosPrestamo.fechaLimite);
        let estadoBadge = '';
        let estadoTexto = '';
        if (datosPrestamo.fechaDevolucion) {
            estadoBadge = '<span class="badge bg-success">Devuelto</span>';
            estadoTexto = `Devuelto el: ${datosPrestamo.fechaDevolucion}`;
        } else {
            const hoy = new Date();
            if (hoy > fechaDevolucionEsperada) {
                estadoBadge = '<span class="badge bg-danger">Vencido</span>';
                const diasRetraso = Math.floor((hoy - fechaDevolucionEsperada) / (1000 * 60 * 60 * 24));
                estadoTexto = `Retraso de ${diasRetraso} día(s)`;
            } else {
                estadoBadge = '<span class="badge bg-primary">Activo</span>';
                const diasRestantes = Math.floor((fechaDevolucionEsperada - hoy) / (1000 * 60 * 60 * 24));
                estadoTexto = `${diasRestantes} día(s) restantes`;
            }
        }
        const contenidoHTML = `
            <div class="container-fluid text-start">
                <div class="row mb-3">
                    <div class="col-12">
                        <h5>Información del Préstamo #${datosPrestamo.idPrestamo}</h5>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <strong>Cliente:</strong><br>
                        ${datosPrestamo.nombreUsuario} ${datosPrestamo.apellidoUsuario}
                    </div>
                    <div class="col-md-6">
                        <strong>Email:</strong><br>
                        ${datosPrestamo.emailUsuario}
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <strong>Fecha de Préstamo:</strong><br>
                        ${datosPrestamo.fechaPrestamo}
                    </div>
                    <div class="col-md-6">
                        <strong>Fecha Límite:</strong><br>
                        ${datosPrestamo.fechaLimite}
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <strong>Estado:</strong><br>
                        ${estadoBadge}
                    </div>
                    <div class="col-md-6">
                        <strong>Detalle:</strong><br>
                        ${estadoTexto}
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <strong>Libros prestados:</strong><br>
                        <div class="border rounded p-2 mt-2 bg-light">
                            ${datosPrestamo.libros
                                .split(', ')
                                .map((libro) => `<li>${libro}</li>`)
                                .join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        Swal.fire({
            title: 'Detalles del Préstamo',
            html: contenidoHTML,
            width: '700px',
            confirmButtonText: 'Cerrar',
            confirmButtonColor: '#007bff',
        });
    } catch (e) {
        console.log(e);
        Swal.fire({
            title: '¡Error!',
            text: 'Error al obtener los detalles',
            icon: 'error',
            confirmButtonColor: '#dc3545',
        });
    }
}
//TODO Fin Sweet Prestamo Ver Detalles
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
        showLoaderOnConfirm: true,
    });
}
//TODO Fin Sweet Alertas Error
// #endregion

//! /////////////////////////////////////////////////////////
//! FIN Funciones SweetAlert (SweetAlert2 Principales)
//! /////////////////////////////////////////////////////////
// #endregion
