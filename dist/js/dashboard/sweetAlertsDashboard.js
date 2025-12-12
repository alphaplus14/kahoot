'use strict';
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
        label.textContent = convertirTextoBD(text);
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
        input.setAttribute('value', convertirTextoBD(value));
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

// #region //* Convertir texto de Base de datos a Texto legible
//TODO Inicio Funcion Convertir texto de Base de datos a Texto legible
function convertirTextoBD(text) {
    const txt = document.createElement('textarea');
    txt.innerHTML = text;
    return txt.value;
}
//TODO Inicio Funcion Convertir texto de Base de datos a Texto legible
// #endregion

//! /////////////////////////////////////////////////////////
//! FIN Funciones Generales
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
                //? Verificar que la contraseña sea mayor a 5 digitos
                if (pass.length < 5) {
                    Swal.showValidationMessage('¡La contraseña debe tener como minimo 5 caracteres!');
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
                //? Verificar que la contraseña sea mayor a 5 digitos
                if (pass.length < 5) {
                    Swal.showValidationMessage('¡La contraseña debe tener como minimo 5 caracteres!');
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

//! /////////////////////////////////////////////////////////
//! FIN Funciones SweetAlert (SweetAlert2 Principales)
//! /////////////////////////////////////////////////////////
// #endregion
