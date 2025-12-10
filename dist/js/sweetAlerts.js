'use strict';

// #region //* Eventos Botones
//! /////////////////////////////////////////////////////////
//! Eventos de Botones
//! /////////////////////////////////////////////////////////

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

// #region //* Traer Datos Categoria (por id)
//TODO Inicio Funcion Traer Datos Usuario (por id)
export async function traerDatosCategoriaPorID(id) {
    try {
        //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
        const formData = new FormData();
        formData.append('id', id);
        //? Solicitud de datos a controller
        const json = await fetch(`../../controller/categorias/controllerDatosCategoriaPorID.php`, {
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
export async function contenidoUsuarioInsertar() {
    try {
        //? Inicio Formulario
        const form = crearForm();
        //? Nombre
        const nombreDiv = crearDivForm();
        const nombreLabel = crearLabelForm('nombreUsuario', 'Nombre');
        const nombreInput = crearInputForm('nombreUsuario', 'text', '');
        nombreDiv.append(nombreLabel);
        nombreDiv.append(nombreInput);
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
        //? Asignacion final Form
        form.append(nombreDiv);
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
//TODO Fin Contenido Usuario Insertar
// #endregion

// #region //* Contenido Usuario Editar
//TODO Inicio Contenido Usuario Editar
export async function contenidoUsuarioEditar(id) {
    try {
        //? Se traen datos de usuario por ID
        const datosUsuario = await traerDatosUsuarioPorID(id);
        //? Inicio Formulario
        const form = crearForm();
        //? Nombre
        const nombreDiv = crearDivForm();
        const nombreLabel = crearLabelForm('nombreUsuario', 'Nombre');
        const nombreInput = crearInputForm('nombreUsuario', 'text', datosUsuario.nombre_usuario);
        nombreDiv.append(nombreLabel);
        nombreDiv.append(nombreInput);
        //? Email
        const emailDiv = crearDivForm();
        const emailLabel = crearLabelForm('emailUsuario', 'Correo');
        const emailInput = crearInputForm('emailUsuario', 'email', datosUsuario.correo_usuario);
        emailDiv.append(emailLabel);
        emailDiv.append(emailInput);
        //? Password
        const passDiv = crearDivForm();
        const passLabel = crearLabelForm('passUsuario', 'Contraseña');
        const passInput = crearInputForm('passUsuario', 'password', '');
        passDiv.append(passLabel);
        passDiv.append(passInput);
        //? Asignacion final Form
        form.append(nombreDiv);
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
//TODO Fin Contenido Usuario Editar
// #endregion

// #region //* Contenido Usuario Activar
//TODO Inicio Contenido Usuario Activar
export async function contenidoUsuarioActivar(id) {
    try {
        //? Se traen datos de usuario por ID
        const usuario = await traerDatosUsuarioPorID(id);
        //? Inicio Formulario
        const form = crearForm();
        //? Label (texto)
        const labelDiv = crearDivForm();
        const label = crearLabelForm('', `¿Desea activar el usuario ${usuario.nombreUsuario} con ID ${id}?`);
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
export async function contenidoUsuarioDesctivar(id) {
    try {
        //? Se traen datos de usuario por ID
        const usuario = await traerDatosUsuarioPorID(id);
        //? Inicio Formulario
        const form = crearForm();
        //? Label (texto)
        const labelDiv = crearDivForm();
        const label = crearLabelForm('', `¿Desea desactivar el usuario ${usuario.nombreUsuario} con ID ${id}?`);
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

// #region //* Contenido Categoria Insertar
//TODO Inicio Contenido Categoria Insertar
export async function contenidoCategoriaInsertar() {
    try {
        //? Inicio Formulario
        const form = crearForm();
        //? Nombre
        const nombreDiv = crearDivForm();
        const nombreLabel = crearLabelForm('nombreCategoria', 'Nombre');
        const nombreInput = crearInputForm('nombreCategoria', 'text', '');
        nombreDiv.append(nombreLabel);
        nombreDiv.append(nombreInput);
        //? Asignacion final Form
        form.append(nombreDiv);
        //? Retorno de HTML
        return form;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Categoria Insertar
// #endregion

// #region //* Contenido Categoria Editar
//TODO Inicio Contenido Categoria Editar
export async function contenidoCategoriaEditar(id) {
    try {
        //? Se traen datos de usuario por ID
        const datosCategoria = await traerDatosCategoriaPorID(id);
        //? Inicio Formulario
        const form = crearForm();
        //? Nombre
        const nombreDiv = crearDivForm();
        const nombreLabel = crearLabelForm('nombreCategoria', 'Nombre');
        const nombreInput = crearInputForm('nombreCategoria', 'text', datosCategoria.nombre_categoria);
        nombreDiv.append(nombreLabel);
        nombreDiv.append(nombreInput);
        //? Asignacion final Form
        form.append(nombreDiv);
        //? Retorno de HTML
        return form;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Categoria Editar
// #endregion

// #region //* Contenido Categoria Activar
//TODO Inicio Contenido Categoria Activar
export async function contenidoCategoriaActivar(id) {
    try {
        //? Se traen datos de Categoria por ID
        const categoria = await traerDatosCategoriaPorID(id);
        //? Inicio Formulario
        const form = crearForm();
        //? Label (texto)
        const labelDiv = crearDivForm();
        const label = crearLabelForm('', `¿Desea activar la categoria ${categoria.nombre_categoria} con ID ${id}?`);
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
//TODO Fin Contenido Categoria Activar
// #endregion

// #region //* Contenido Categoria Desctivar
//TODO Inicio Contenido Categoria Desactivar
export async function contenidoCategoriaDesctivar(id) {
    try {
        //? Se traen datos de usuario por ID
        const categoria = await traerDatosCategoriaPorID(id);
        //? Inicio Formulario
        const form = crearForm();
        //? Label (texto)
        const labelDiv = crearDivForm();
        const label = crearLabelForm('', `¿Desea desactivar la categoria ${categoria.nombre_categoria} con ID ${id}?`);
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
//TODO Fin Contenido Categoria Desactivar
// #endregion

// #region //* Contenido Politica & Privacidad
//TODO Inicio Contenido Politica Privacidad
export async function contenidoPoliticaPrivacidad() {
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
export async function contenidoTerminosCondiciones() {
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
export async function sweetUsuarioInsertar() {
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
                const email = document.querySelector('#emailUsuario').value.trim();
                //* Validar formato de correo antes de continuar
                const emailValue = email;
                const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!regexCorreo.test(emailValue)) {
                    Swal.showValidationMessage('Formato de correo no válido');
                    return false;
                }
                const pass = document.querySelector('#passUsuario').value.trim();
                //? Verificar que los campos esten llenos
                if (!nombre || !email || !pass) {
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
                    email,
                    pass,
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
                formData.append('email', datos.email);
                formData.append('pass', datos.pass);
                //? Solicitud de datos a controller
                const json = await fetch('../../controller/usuarios/controllerUsuarioInsertar.php', {
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
export async function sweetUsuarioEditar(id) {
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
                const email = document.querySelector('#emailUsuario').value.trim();
                //* Validar formato de correo antes de continuar
                const emailValue = email;
                const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!regexCorreo.test(emailValue)) {
                    Swal.showValidationMessage('Formato de correo no válido');
                    return false;
                }
                let pass = document.querySelector('#passUsuario').value.trim();
                //? Se verifica si se escribio una password nueva o se dejo vacio
                let bool = false;
                if (pass == null || pass == '') {
                    //? Si se dejo vacio se asigna la contraseña anterior
                    pass = datosUsuario.password_usuario;
                    bool = true;
                }
                //? Verificar que los campos esten llenos
                if (!nombre || !email || !pass) {
                    Swal.showValidationMessage('¡Todos los campos son requeridos!');
                    return false;
                }
                //? Verificacion de Email del Usuario
                if (email != datosUsuario.correo_usuario) {
                    let boolEmail = await verificarEmail(email);
                    if (boolEmail == false) {
                        Swal.showValidationMessage('¡Email ya existente, intenta con otro email!');
                        return false;
                    }
                }
                //? Retornar valores finales
                return {
                    nombre,
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
                formData.append('email', datos.email);
                formData.append('pass', datos.pass);
                formData.append('bool', datos.bool);
                formData.append('id', datos.id);
                //? Solicitud de datos a controller
                const json = await fetch('../../controller/usuarios/controllerUsuarioEditar.php', {
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
export async function sweetUsuarioActivar(id) {
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
                const json = await fetch('../../controller/usuarios/controllerUsuarioActivar.php', {
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
export async function sweetUsuarioDesactivar(id) {
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
                const json = await fetch('../../controller/usuarios/controllerUsuarioDesactivar.php', {
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

// #region //* Sweet Categoria Insertar
//TODO Inicio SweetAlert Categoria Insertar
export async function sweetCategoriaInsertar() {
    try {
        Swal.fire({
            title: 'Crear Nuevo Categoria', //? Titulo Modal
            showLoaderOnConfirm: true, //? Muestra loader mientras espera el preConfirm
            html: await contenidoCategoriaInsertar(), //? Contenido HTML
            confirmButtonText: 'Confirmar', //? Texto boton confirmar
            showCancelButton: true, //? Mostrar boton cancelar
            cancelButtonText: 'Cancelar', //? Texto boton cancelar
            focusConfirm: false, //? Desactivar focus al boton confirmar
            confirmButtonColor: '#007bff', //? Color boton confirmar
            cancelButtonColor: '#dc3545', //? Color boton cancelar
            preConfirm: async () => {
                //? Se capturan los datos del formulario
                const nombre = document.querySelector('#nombreCategoria').value.trim();
                //? Verificar que los campos esten llenos
                if (!nombre) {
                    Swal.showValidationMessage('¡Todos los campos son requeridos!');
                    return false;
                }
                //? Retornar valores finales
                return {
                    nombre,
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
                //? Solicitud de datos a controller
                const json = await fetch('../../controller/categorias/controllerCategoriaInsertar.php', {
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

// #region //* Sweet Categoria Editar
//TODO Inicio SweetAlert Categoria Editar
export async function sweetCategoriaEditar(id) {
    try {
        Swal.fire({
            title: 'Editar Categoria', //? Titulo Modal
            showLoaderOnConfirm: true, //? muestra loader mientras espera el preConfirm
            html: await contenidoCategoriaEditar(id), //? Contenido HTML
            confirmButtonText: 'Confirmar', //? Texto boton confirmar
            showCancelButton: true, //? Mostrar boton cancelar
            cancelButtonText: 'Cancelar', //? Texto boton cancelar
            focusConfirm: false, //? Desactivar focus al boton crear
            confirmButtonColor: '#007bff', //? Color boton confirmar
            cancelButtonColor: '#dc3545', //? Color boton cancelar
            preConfirm: async () => {
                //? Se traen datos de Categoria por ID
                const datosCategoria = await traerDatosCategoriaPorID(id);
                //? Se capturan los datos del formulario
                const nombre = document.querySelector('#nombreCategoria').value.trim();
                //? Verificar que los campos esten llenos
                if (!nombre) {
                    Swal.showValidationMessage('¡Todos los campos son requeridos!');
                    return false;
                }
                //? Retornar valores finales
                return {
                    nombre,
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
                formData.append('id', datos.id);
                //? Solicitud de datos a controller
                const json = await fetch('../../controller/categorias/controllerCategoriaEditar.php', {
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
//TODO Fin SweetAlert Categoria Editar
// #endregion

// #region //* Sweet Categoria Activar
//TODO Inicio SweetAlert Activar Categoria
export async function sweetCategoriaActivar(id) {
    try {
        Swal.fire({
            title: 'Activar Categoria', //? Titulo Modal
            icon: 'question', //? Icono Modal
            showLoaderOnConfirm: true, //? muestra loader mientras espera el preConfirm
            html: await contenidoCategoriaActivar(id), //? Contenido HTML
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
                const json = await fetch('../../controller/categorias/controllerCategoriaActivar.php', {
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
//TODO Fin SweetAlert Activar Categoria
// #endregion

// #region //* Sweet Categoria Desactivar
//TODO Inicio SweetAlert Desactivar Categoria
export async function sweetCategoriaDesactivar(id) {
    try {
        Swal.fire({
            title: 'Desactivar Categoria', //? Titulo Modal
            icon: 'warning', //? Icono Modal
            showLoaderOnConfirm: true, //? muestra loader mientras espera el preConfirm
            html: await contenidoCategoriaDesctivar(id), //? Contenido HTML
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
                const json = await fetch('../../controller/categorias/controllerCategoriaDesactivar.php', {
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
//TODO Fin SweetAlert Desactivar Categoria
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

//! /////////////////////////////////////////////////////////
//! FIN Funciones SweetAlert (SweetAlert2 Principales)
//! /////////////////////////////////////////////////////////
// #endregion
