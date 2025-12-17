// #region //* Convertir texto de Base de datos a Texto legible
//TODO Inicio Funcion Convertir texto de Base de datos a Texto legible
function convertirTextoBD(text) {
    const txt = document.createElement('textarea');
    txt.innerHTML = text;
    return txt.value;
}
//TODO Inicio Funcion Convertir texto de Base de datos a Texto legible
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
        option.textContent = convertirTextoBD(text);
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
        li.classList.add('text-start');
        const p = document.createElement('p');
        p.textContent = convertirTextoBD(text);
        li.append(p);
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
        const decode = convertirTextoBD(text);
        preguntaText.value = decode;
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

// #region //* Contenido Cargar Datos Juego
async function contenidoCargarDatosJuego(datos, puntos) {
    try {
        const form = crearForm();
        //? Puntos
        const divPuntos = crearDivForm();
        const labelPuntos = crearLabelForm('', 'Obtuviste ' + puntos + ' puntos en total!');
        divPuntos.append(labelPuntos);
        form.append(divPuntos);
        //? Preguntas
        const divInfoPregunta = crearDivForm();
        const labelInfoPregunta = crearLabelForm('', 'Preguntas del cuestionario:');
        divInfoPregunta.append(labelInfoPregunta);
        form.append(divInfoPregunta);
        let contador = 1;

        datos.forEach((elemento) => {
            const separador = document.createElement('p');
            separador.textContent = '----------------------------------------------------------------------------';
            const divPreguntas = crearDivForm();
            const lista = crearLista('ul', '');
            const contadorPregunta = crearLi('Pregunta #' + contador);
            contador++;
            const respuesta_A = crearLi('A: ' + elemento.respuesta_A);
            const respuesta_B = crearLi('B: ' + elemento.respuesta_B);
            const respuesta_C = crearLi('C: ' + elemento.respuesta_C);
            const respuesta_D = crearLi('D: ' + elemento.respuesta_D);
            const respuesta_correcta = crearLi('Respuesta correcta: ' + elemento.respuesta_correcta);
            const respuesta_seleccionada = crearLi('Seleccionada: ' + elemento.respuesta_seleccionada);
            if (elemento.respuesta_correcta == elemento.respuesta_seleccionada) {
                const badge = document.createElement('span');
                badge.classList.add('badge', 'text-bg-success', 'p-2', 'fs-6', 'ms-2', 'rounded-3');
                badge.textContent = 'Correcta';
                respuesta_seleccionada.append(badge);
            } else {
                const badge = document.createElement('span');
                badge.classList.add('badge', 'text-bg-danger', 'p-2', 'fs-6', 'ms-2', 'rounded-3');
                badge.textContent = 'Incorrecta';
                respuesta_seleccionada.append(badge);
            }
            //? Asignacion
            lista.append(contadorPregunta);
            lista.append(respuesta_A);
            lista.append(respuesta_B);
            lista.append(respuesta_C);
            lista.append(respuesta_D);
            lista.append(respuesta_correcta);
            lista.append(respuesta_seleccionada);
            lista.append(separador);
            divPreguntas.append(lista);
            form.append(divPreguntas);
        });
        return form;
    } catch (error) {
        console.log(error);
        return false;
    }
}
// #endregion

// #region //* Sweet Usuario Desactivar
//TODO Inicio SweetAlert Desactivar Usuario
export async function sweetCargarDatosJuego(datos, puntos) {
    try {
        Swal.fire({
            title: 'Resumen de juego', //? Titulo Modal
            icon: 'info', //? Icono Modal
            showLoaderOnConfirm: true, //? muestra loader mientras espera el preConfirm
            html: await contenidoCargarDatosJuego(datos, puntos), //? Contenido HTML
            confirmButtonText: 'Aceptar', //? Texto boton confirmar
            focusConfirm: false, //? Desactivar focus al boton crear
            confirmButtonColor: '#007bff', //? Color boton confirmar
            preConfirm: () => {
                return (window.location.href = '../../index.php');
            },
        });
    } catch (e) {
        //? Control de errores
        console.log(e);
        return false;
    }
}
//TODO Fin SweetAlert Desactivar Usuario
// #endregion
