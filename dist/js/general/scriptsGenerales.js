import { sweetUsuarioEditar } from '../dashboard/sweetAlertsDashboard.js';

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

//! /////////////////////////////////////////////////////////
//! FIN Definicion de Funciones createElement
//! /////////////////////////////////////////////////////////

// #endregion

// #region //* Contenidos de HTML para los SweetAlert
//! /////////////////////////////////////////////////////////
//! Contenidos de HTML para los SweetAlert
//! /////////////////////////////////////////////////////////

// #region //* Contenido Politica & Privacidad
//TODO Inicio Contenido Politica Privacidad
async function contenidoPoliticaPrivacidad() {
    try {
        //? Texto a mostrar
        const text = `
        1. Recolección de Información: 
        El juego puede recopilar datos básicos, como:
        Puntajes,
        Respuestas seleccionadas, nombres,
        Tiempo de juego y Ficha perteneciente.
        2. Uso de la Información: 
        La información recolectada se utiliza únicamente para:
        Medir el desempeño dentro del juego,
        Mejorar la experiencia de aprendizaje,
        Realizar análisis pedagógicos generales (si aplica).
        Los datos no son vendidos ni compartidos con terceros.
        3. Almacenamiento y Seguridad: 
        Los datos almacenados son protegidos mediante medidas razonables de seguridad.
        Sin embargo, el usuario entiende que ningún sistema digital es 100 % infalible.
        4. Uso en Contexto Educativo: 
        Los resultados generados por el juego pueden ser utilizados por instructores o administrativos únicamente con fines formativos y pedagógicos, nunca para evaluaciones oficiales sin aviso previo.
        5. Modificaciones a la Política: 
        Los presentes términos pueden ser actualizados en cualquier momento.
        El uso continuo del juego implica la aceptación de los cambios.
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
        const text = `1. Aceptación de los Términos:
                        Al acceder y utilizar este juego de preguntas, el usuario reconoce que ha leído, entendido y aceptado los presentes Términos y Condiciones. Si no está de acuerdo con alguno de ellos, debe abstenerse de usar la aplicación.
                        2. Objetivo del Juego: 
                        El juego “¿Y esa Pregunta?” es una herramienta didáctica diseñada para apoyar procesos de formación, reforzar conocimientos y promover el aprendizaje interactivo dentro del contexto educativo del SENA (Servicio Nacional de Aprendizaje).
                        Este juego no reemplaza contenidos oficiales ni evaluaciones institucionales.
                        3. Uso Permitido: 
                        El usuario se compromete a:
                        Usar el juego únicamente con fines educativos.
                        No manipular, alterar o intentar vulnerar la funcionalidad del sistema.
                        Abstenerse de usar lenguaje ofensivo o inapropiado en las áreas donde pueda ingresar información.
                        4. Propiedad Intelectual: 
                        Todos los contenidos, preguntas, diseños, textos, gráficos y elementos asociados al juego son propiedad de sus desarrolladores y/o de la entidad SENA, cuando aplique.
                        Queda prohibida la reproducción o distribución del material sin autorización previa.
                        5. Limitación de Responsabilidad: 
                        El juego se ofrece “tal cual”, sin garantías de disponibilidad continua o ausencia de errores.
                        El SENA o los desarrolladores no se hacen responsables por:
                        Interrupciones en el servicio,
                        Pérdida de datos por fallos técnicos,
                        Interpretaciones erróneas de las preguntas por parte del usuario.
                        El uso de la herramienta es completamente voluntario.
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

// #region //* Eventos Botones
//! /////////////////////////////////////////////////////////
//! Eventos de Botones
//! /////////////////////////////////////////////////////////

// #region //* Editar perfil
const editarPerfil = document.querySelector('#configuracionPerfil');

editarPerfil.addEventListener('click', () => {
    sweetUsuarioEditar(editarPerfil.name);
});

// #endregion

// #region //* Terminos & Condiciones
const terminosCondiciones = document.querySelector('#terminosCondiciones');

terminosCondiciones.addEventListener('click', () => {
    sweetTerminosCondiciones();
});

// #endregion

// #region //* Politica & Privacidad
const politicaPrivacidad = document.querySelector('#politicaPrivacidad');

politicaPrivacidad.addEventListener('click', () => {
    sweetPoliticaPrivacidad();
});

// #endregion

//! /////////////////////////////////////////////////////////
//! FIN Eventos de Botones
//! /////////////////////////////////////////////////////////

// #endregion
