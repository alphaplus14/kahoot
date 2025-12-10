'use strict';
// #region //* Funciones Generales
//! /////////////////////////////////////////////////////////
//! Funciones Generales
//! /////////////////////////////////////////////////////////

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

// #region //* Definicion de Funciones createElement
//! /////////////////////////////////////////////////////////
//! Definicion de Funciones createElement
//! /////////////////////////////////////////////////////////

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

//! /////////////////////////////////////////////////////////
//! FIN Definicion de Funciones createElement
//! /////////////////////////////////////////////////////////

// #endregion

// #region //* Funciones SweetAlert Main
//! /////////////////////////////////////////////////////////
//! Funciones SweetAlert (SweetAlert2 Principales)
//! /////////////////////////////////////////////////////////

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

//! /////////////////////////////////////////////////////////
//! FIN Funciones SweetAlert (SweetAlert2 Principales)
//! /////////////////////////////////////////////////////////
// #endregion
