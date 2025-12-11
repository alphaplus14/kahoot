'use strict';

// #region //* Funciones Generales
//! /////////////////////////////////////////////////////////
//! Funciones Generales
//! /////////////////////////////////////////////////////////

// #region //* Traer Datos Cuestionario (por id)
//TODO Inicio Funcion Traer Datos Cuestionario (por id)
export async function traerDatosCuestionarioPorID(id) {
    try {
        //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
        const formData = new FormData();
        formData.append('id', id);
        //? Solicitud de datos a controller
        const json = await fetch(`../../controller/cuestionarios/controllerDatosCuestionarioPorID.php`, {
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
//TODO Fin Funcion Traer Datos Cuestionario (por id)
// #endregion

// #region //* Traer Datos Categorias
//TODO Inicio Funcion Traer Datos Categorias
export async function traerDatosCategorias() {
    try {
        //? Solicitud de datos a controller
        const json = await fetch(`../../controller/categorias/controllerDatosCategorias.php`);
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
//TODO Fin Funcion Traer Datos Categorias
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
        li.classList.add("text-start")
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

// #region //* Crear textArea
//TODO Inicio Crear textArea
function crearTextArea(id, text) {
    try {
        //? Creacion de elemento TextArea
        const preguntaText = document.createElement('textarea');
        preguntaText.classList.add('form-control', 'mb-2');
        preguntaText.setAttribute('style', 'height: 100px');
        //? id
        preguntaText.setAttribute('id', id);
        //? texto
        preguntaText.textContent = text;
        //? Retorno de elemento
        return preguntaText;
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

// #region //* Contenido SweetAlert
//! /////////////////////////////////////////////////////////
//! Definicion de Funciones createElement
//! /////////////////////////////////////////////////////////

// #region //* Contenido Cuestionario Insertar
//TODO Inicio Contenido Cuestionario Insertar
export async function contenidoCuestionarioInsertar() {
    try {
        //? Traer categorias
        const categorias = await traerDatosCategorias();
        console.log(categorias);
        //? Inicio Formulario
        const form = crearForm();
        //? Pregunta
        const preguntaDiv = crearDivPersonalizado('', 'form-floating');
        const preguntaText = crearTextArea('inputPregunta', '');
        const preguntaLabel = crearLabelForm('inputPregunta', 'Ingresa la pregunta');
        //? Asignaciones
        preguntaDiv.append(preguntaText);
        preguntaDiv.append(preguntaLabel);
        form.append(preguntaDiv);
        //? Respuestas
        const letras = ['A', 'B', 'C', 'D'];
        for (let i = 0; i < 4; i++) {
            const respuestaDiv = crearDivPersonalizado('', 'form-floating');
            const textPregunta = crearTextArea('inputRespuesta' + letras[i], '');
            const labelPregunta = crearLabelForm('inputRespuesta' + letras[i], 'Ingresa la respuesta ' + letras[i]);
            //? Asignaciones
            respuestaDiv.append(textPregunta);
            respuestaDiv.append(labelPregunta);
            form.append(respuestaDiv);
        }
        //? Respuesta Correcta
        const respuestaCorrectaDiv = crearSelectForm('selectRespuestaCorrecta');
        respuestaCorrectaDiv.classList.add('mb-2');
        const respuestaCorrectaOptionCheck = crearOptionForm('', 'Selecciona la opcion correcta', true);
        respuestaCorrectaDiv.append(respuestaCorrectaOptionCheck);
        for (let i = 0; i < 4; i++) {
            const option = crearOptionForm(letras[i], 'Respuesta ' + letras[i], false);
            respuestaCorrectaDiv.append(option);
        }
        form.append(respuestaCorrectaDiv);
        //? Categorias
        const categoriasDiv = crearSelectForm('selectCategorias');
        const categoriasOptionCheck = crearOptionForm('', 'Selecciona una categoria', true);
        categoriasDiv.append(categoriasOptionCheck);
        for (let i = 0; i < categorias.length; i++) {
            const option = crearOptionForm(categorias[i].id_categoria, categorias[i].nombre_categoria, false);
            categoriasDiv.append(option);
        }
        categoriasDiv.classList.add('mb-2');
        form.append(categoriasDiv);
        //? Retorno de HTML
        return form;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Cuestionario Insertar
// #endregion

// #region //* Contenido Cuestionario Editar
//TODO Inicio Contenido Cuestionario Editar
export async function contenidoCuestionarioEditar(id) {
    try {
        //? Traer categorias
        const categorias = await traerDatosCategorias();
        const cuestionario = await traerDatosCuestionarioPorID(id);
        //? Inicio Formulario
        const form = crearForm();
        //? Pregunta
        const preguntaDiv = crearDivPersonalizado('', 'form-floating');
        const preguntaText = crearTextArea('inputPregunta', cuestionario.pregunta);
        const preguntaLabel = crearLabelForm('inputPregunta', 'Ingresa la pregunta');
        //? Asignaciones
        preguntaDiv.append(preguntaText);
        preguntaDiv.append(preguntaLabel);
        form.append(preguntaDiv);
        //? Respuestas
        const letras = ['A', 'B', 'C', 'D'];
        const respuestas = [
            cuestionario.respuesta_A,
            cuestionario.respuesta_B,
            cuestionario.respuesta_C,
            cuestionario.respuesta_D,
        ];
        for (let i = 0; i < 4; i++) {
            const respuestaDiv = crearDivPersonalizado('', 'form-floating');
            const textPregunta = crearTextArea('inputRespuesta' + letras[i], respuestas[i]);
            const labelPregunta = crearLabelForm('inputRespuesta' + letras[i], 'Ingresa la respuesta ' + letras[i]);
            //? Asignaciones
            respuestaDiv.append(textPregunta);
            respuestaDiv.append(labelPregunta);
            form.append(respuestaDiv);
        }
        //? Respuesta Correcta
        const respuestaCorrectaDiv = crearSelectForm('selectRespuestaCorrecta');
        respuestaCorrectaDiv.classList.add('mb-2');
        const respuestaCorrectaOptionCheck = crearOptionForm('', 'Selecciona la opcion correcta', false);
        respuestaCorrectaDiv.append(respuestaCorrectaOptionCheck);
        for (let i = 0; i < 4; i++) {
            if (cuestionario.respuesta_correcta == respuestas[i]) {
                const option = crearOptionForm(letras[i], 'Respuesta ' + letras[i], true);
                respuestaCorrectaDiv.append(option);
            } else {
                const option = crearOptionForm(letras[i], 'Respuesta ' + letras[i], false);
                respuestaCorrectaDiv.append(option);
            }
        }
        form.append(respuestaCorrectaDiv);
        //? Categorias
        const categoriasDiv = crearSelectForm('selectCategorias');
        const categoriasOptionCheck = crearOptionForm('', 'Selecciona una categoria', false);
        categoriasDiv.append(categoriasOptionCheck);
        for (let i = 0; i < categorias.length; i++) {
            if (cuestionario.categorias_id_categoria == categorias[i].id_categoria) {
                const option = crearOptionForm(categorias[i].id_categoria, categorias[i].nombre_categoria, true);
                categoriasDiv.append(option);
            } else {
                const option = crearOptionForm(categorias[i].id_categoria, categorias[i].nombre_categoria, false);
                categoriasDiv.append(option);
            }
        }
        categoriasDiv.classList.add('mb-2');
        form.append(categoriasDiv);
        //? Retorno de HTML
        return form;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Cuestionario Editar
// #endregion

// #region //* Contenido Cuestionario Activar
//TODO Inicio Contenido Cuestionario Activar
export async function contenidoCuestionarioActivar(id) {
    try {
        //? Se traen datos de Cuestionario por ID
        const Cuestionario = await traerDatosCuestionarioPorID(id);
        //? Inicio Formulario
        const form = crearForm();
        //? Label (texto)
        const labelDiv = crearDivForm();
        const label = crearLabelForm('', `¿Desea activar la Cuestionario ${Cuestionario.nombre_Cuestionario} con ID ${id}?`);
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
//TODO Fin Contenido Cuestionario Activar
// #endregion

// #region //* Contenido Cuestionario Desctivar
//TODO Inicio Contenido Cuestionario Desactivar
export async function contenidoCuestionarioDesctivar(id) {
    try {
        //? Se traen datos de usuario por ID
        const Cuestionario = await traerDatosCuestionarioPorID(id);
        //? Inicio Formulario
        const form = crearForm();
        //? Label (texto)
        const labelDiv = crearDivForm();
        const label = crearLabelForm('', `¿Desea desactivar la Cuestionario ${Cuestionario.nombre_Cuestionario} con ID ${id}?`);
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
//TODO Fin Contenido Cuestionario Desactivar
// #endregion

// #region //* Contenido Cuestionario Ver Respuestas
//TODO Inicio Contenido Cuestionario Ver Respuestas
export async function contenidoCuestionarioVerRespuestas(id) {
    try {
        //? Se traen datos de usuario por ID
        const cuestionario = await traerDatosCuestionarioPorID(id);
        //? Inicio Formulario
        const form = crearForm();
        //? Respuestas
        const lista = crearLista('ol', 'listaRespuestas');
        const liRptA = crearLi('Respuesta A: ' + cuestionario.respuesta_A);
        const liRptB = crearLi('Respuesta B: ' + cuestionario.respuesta_B);
        const liRptC = crearLi('Respuesta C: ' + cuestionario.respuesta_C);
        const liRptD = crearLi('Respuesta D: ' + cuestionario.respuesta_D);
        const liRptCorrecta = crearLi('Respuesta Correcta: ' + cuestionario.respuesta_correcta);
        lista.append(liRptA);
        lista.append(liRptB);
        lista.append(liRptC);
        lista.append(liRptD);
        lista.append(liRptCorrecta);
        //? Asignacion final Form
        form.append(lista);
        //? Retorno de HTML
        return form;
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin Contenido Cuestionario Ver Respuestas
// #endregion

//! /////////////////////////////////////////////////////////
//! FIN Definicion de Funciones createElement
//! /////////////////////////////////////////////////////////

// #endregion

// #region //* Funciones SweetAlert Main
//! /////////////////////////////////////////////////////////
//! Funciones SweetAlert (SweetAlert2 Principales)
//! /////////////////////////////////////////////////////////

// #region //* Sweet Cuestionario Insertar
//TODO Inicio SweetAlert Cuestionario Insertar
export async function sweetCuestionarioInsertar() {
    try {
        Swal.fire({
            title: 'Crear Nuevo Cuestionario', //? Titulo Modal
            showLoaderOnConfirm: true, //? Muestra loader mientras espera el preConfirm
            html: await contenidoCuestionarioInsertar(), //? Contenido HTML
            confirmButtonText: 'Confirmar', //? Texto boton confirmar
            showCancelButton: true, //? Mostrar boton cancelar
            cancelButtonText: 'Cancelar', //? Texto boton cancelar
            focusConfirm: false, //? Desactivar focus al boton confirmar
            confirmButtonColor: '#007bff', //? Color boton confirmar
            cancelButtonColor: '#dc3545', //? Color boton cancelar
            preConfirm: async () => {
                //? Se capturan los datos del formulario
                const pregunta = document.querySelector('#inputPregunta').value.trim();
                const respuestaA = document.querySelector('#inputRespuestaA').value.trim();
                const respuestaB = document.querySelector('#inputRespuestaB').value.trim();
                const respuestaC = document.querySelector('#inputRespuestaC').value.trim();
                const respuestaD = document.querySelector('#inputRespuestaD').value.trim();
                let respuestaCorrecta = document.querySelector('#selectRespuestaCorrecta').value.trim();
                const categoria = document.querySelector('#selectCategorias').value.trim();
                //? Verificar que los campos esten llenos
                if (!pregunta || !respuestaA || !respuestaB || !respuestaC || !respuestaD || !respuestaCorrecta || !categoria) {
                    Swal.showValidationMessage('¡Todos los campos son requeridos!');
                    return false;
                }
                //? Asignar respuesta correcta
                switch (respuestaCorrecta) {
                    case 'A':
                        respuestaCorrecta = respuestaA;
                        break;
                    case 'B':
                        respuestaCorrecta = respuestaB;
                        break;
                    case 'C':
                        respuestaCorrecta = respuestaC;
                        break;
                    case 'D':
                        respuestaCorrecta = respuestaD;
                        break;
                    default:
                        break;
                }
                //? Retornar valores finales
                return {
                    pregunta,
                    respuestaA,
                    respuestaB,
                    respuestaC,
                    respuestaD,
                    respuestaCorrecta,
                    categoria,
                };
            },
        }).then(async (result) => {
            //? Verificar click en boton confirmar
            if (result.isConfirmed) {
                //? Traer datos retornados del preConfirm
                const datos = result.value;
                //? Se añaden Datos a FormData (Se usa para que el fetch acepte los datos correctamente)
                let formData = new FormData();
                formData.append('pregunta', datos.pregunta);
                formData.append('respuestaA', datos.respuestaA);
                formData.append('respuestaB', datos.respuestaB);
                formData.append('respuestaC', datos.respuestaC);
                formData.append('respuestaD', datos.respuestaD);
                formData.append('respuestaCorrecta', datos.respuestaCorrecta);
                formData.append('categoria', datos.categoria);
                //? Solicitud de datos a controller
                const json = await fetch('../../controller/cuestionarios/controllerCuestionarioInsertar.php', {
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

// #region //* Sweet Cuestionario Editar
//TODO Inicio SweetAlert Cuestionario Editar
export async function sweetCuestionarioEditar(id) {
    try {
        Swal.fire({
            title: 'Editar Cuestionario', //? Titulo Modal
            showLoaderOnConfirm: true, //? muestra loader mientras espera el preConfirm
            html: await contenidoCuestionarioEditar(id), //? Contenido HTML
            confirmButtonText: 'Confirmar', //? Texto boton confirmar
            showCancelButton: true, //? Mostrar boton cancelar
            cancelButtonText: 'Cancelar', //? Texto boton cancelar
            focusConfirm: false, //? Desactivar focus al boton crear
            confirmButtonColor: '#007bff', //? Color boton confirmar
            cancelButtonColor: '#dc3545', //? Color boton cancelar
            preConfirm: async () => {
                //? Se traen datos de Cuestionario por ID
                const datosCuestionario = await traerDatosCuestionarioPorID(id);
                //? Se capturan los datos del formulario
                const nombre = document.querySelector('#nombreCuestionario').value.trim();
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
                const json = await fetch('../../controller/cuestionarios/controllerCuestionarioEditar.php', {
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
//TODO Fin SweetAlert Cuestionario Editar
// #endregion

// #region //* Sweet Cuestionario Activar
//TODO Inicio SweetAlert Activar Cuestionario
export async function sweetCuestionarioActivar(id) {
    try {
        Swal.fire({
            title: 'Activar Cuestionario', //? Titulo Modal
            icon: 'question', //? Icono Modal
            showLoaderOnConfirm: true, //? muestra loader mientras espera el preConfirm
            html: await contenidoCuestionarioActivar(id), //? Contenido HTML
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
                const json = await fetch('../../controller/cuestionarios/controllerCuestionarioActivar.php', {
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
//TODO Fin SweetAlert Activar Cuestionario
// #endregion

// #region //* Sweet Cuestionario Desactivar
//TODO Inicio SweetAlert Desactivar Cuestionario
export async function sweetCuestionarioDesactivar(id) {
    try {
        Swal.fire({
            title: 'Desactivar Cuestionario', //? Titulo Modal
            icon: 'warning', //? Icono Modal
            showLoaderOnConfirm: true, //? muestra loader mientras espera el preConfirm
            html: await contenidoCuestionarioDesctivar(id), //? Contenido HTML
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
                const json = await fetch('../../controller/cuestionarios/controllerCuestionarioDesactivar.php', {
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
//TODO Fin SweetAlert Desactivar Cuestionario
// #endregion

// #region //* SweetAlert Cuestionario Ver Respuestas
//TODO Inicio SweetAlert Cuestionario Ver Respuestas
export async function sweetCuestionarioVerRespuestas(id) {
    try {
        Swal.fire({
            title: 'Respuestas del Cuestionario', //? Titulo Modal
            icon: 'info', //? Icono Modal
            html: await contenidoCuestionarioVerRespuestas(id), //? Contenido HTML
            confirmButtonText: 'Confirmar', //? Texto boton confirmar
            focusConfirm: false, //? Desactivar focus al boton crear
            confirmButtonColor: '#007bff', //? Color boton confirmar
        });
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin SweetAlert Cuestionario Ver Respuestas
// #endregion

//! /////////////////////////////////////////////////////////
//! FIN Funciones SweetAlert (SweetAlert2 Principales)
//! /////////////////////////////////////////////////////////
// #endregion
