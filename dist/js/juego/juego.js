import { sweetCargarDatosJuego } from './sweetAlerts.js';
// #region //* Convertir texto de Base de datos a Texto legible
//TODO Inicio Funcion Convertir texto de Base de datos a Texto legible
function convertirTextoBD(text) {
    const txt = document.createElement('textarea');
    txt.innerHTML = text;
    return txt.value;
}
//TODO Inicio Funcion Convertir texto de Base de datos a Texto legible
// #endregion

fetch('../../controller/jugadores/controllerJugadorCargarPreguntas.php')
    .then((response) => response.json())
    .then((datos) => {
        console.log(datos);
        //? Captura de elementos HTML para realizar distintas funcionalidades
        const pregunta = document.querySelector('#pregunta');
        const A = document.querySelector('.respuestaA');
        const B = document.querySelector('.respuestaB');
        const C = document.querySelector('.respuestaC');
        const D = document.querySelector('.respuestaD');
        const contador = document.querySelector('#contador');
        const puntosJugador = document.querySelector('#puntos');
        //! Declaracion de variables
        //? Booleanos
        let boolRpta = false;
        //? Indice de preguntas
        let i = 0;
        //? Segundos de duracion pr pregunta
        const segundos = datos[0].segundos_pregunta_partida;
        //* Variable prueba
        // const segundos = 2;
        let tiempoRestante = segundos;
        //? variable intervalo (contador de segundos restantes)
        let intervaloContador;
        //? Inidice de preguntas para verificaciones
        let contadorPreguntas = 0;
        //! Datos del jugador a mostrar
        //? Puntaje de jugador
        let valorPuntosPorSegundo = 10000 / datos[0].segundos_pregunta_partida;
        let puntos = 0;
        //? preguntas correctas
        let preguntasCorrectas = [];

        //* Funcion para cargar la siguiente pregunta
        function mostrarPregunta() {
            if (i >= datos.length) {
                setTimeout(() => {
                    sweetCargarDatosJuego(preguntasCorrectas, puntos);
                    return;
                }, 100);
            } else {
                //? Habilitar botones
                A.removeAttribute('disabled');
                B.removeAttribute('disabled');
                C.removeAttribute('disabled');
                D.removeAttribute('disabled');
                pregunta.textContent = convertirTextoBD(datos[i].pregunta);
                A.textContent = 'A: ' + convertirTextoBD(datos[i].respuesta_A);
                B.textContent = 'B: ' + convertirTextoBD(datos[i].respuesta_B);
                C.textContent = 'C: ' + convertirTextoBD(datos[i].respuesta_C);
                D.textContent = 'D: ' + convertirTextoBD(datos[i].respuesta_D);
                //? Pasar a la siguiente pregunta
                i++;
                boolRpta = false;
                iniciarContador();
            }
        }

        //* Funcion contador de juego
        function iniciarContador() {
            contador.textContent = 'Tiempo Restante: ' + tiempoRestante;
            //! limpiar contador anterior
            clearInterval(intervaloContador);
            intervaloContador = setInterval(() => {
                if (tiempoRestante <= 0) {
                    //? Deshabilitar botones
                    A.setAttribute('disabled', 'disabled');
                    B.setAttribute('disabled', 'disabled');
                    C.setAttribute('disabled', 'disabled');
                    D.setAttribute('disabled', 'disabled');
                    if (boolRpta == false) {
                        boolRpta = true;
                        preguntasCorrectas.push({
                            pregunta: datos[contadorPreguntas].pregunta,
                            respuesta_A: datos[contadorPreguntas].respuesta_A,
                            respuesta_B: datos[contadorPreguntas].respuesta_B,
                            respuesta_C: datos[contadorPreguntas].respuesta_C,
                            respuesta_D: datos[contadorPreguntas].respuesta_D,
                            respuesta_correcta: datos[contadorPreguntas].respuesta_correcta,
                            respuesta_seleccionada: 'Pregunta no respondida',
                        });
                        switch (datos[contadorPreguntas].respuesta_correcta) {
                            case datos[contadorPreguntas].respuesta_A:
                                A.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                                B.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                C.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                D.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                break;
                            case datos[contadorPreguntas].respuesta_B:
                                A.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                B.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                                C.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                D.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                break;
                            case datos[contadorPreguntas].respuesta_C:
                                A.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                B.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                C.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                                D.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                break;
                            case datos[contadorPreguntas].respuesta_D:
                                A.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                B.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                C.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                D.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                                break;
                            default:
                                break;
                        }
                        contadorPreguntas++;
                    }
                    //! Detener el intervalo
                    clearInterval(intervaloContador);
                    contador.textContent = 'Tiempo Restante: ' + tiempoRestante;
                    //! Esperar 2 segundos antes de mostrar pregunta
                    setTimeout(() => {
                        tiempoRestante = segundos; //! Reiniciar tiempo
                        mostrarPregunta(); //!  Mostrar pregunta
                    }, 3000);
                } else {
                    tiempoRestante--;
                    contador.textContent = 'Tiempo Restante: ' + tiempoRestante;
                }
            }, 1000);
        }

        //* Formulario (con evento click para los botones)
        const form = document.querySelector('.formPreguntas');
        form.addEventListener('click', (e) => {
            if (contadorPreguntas < datos.length) {
                //? Deshabilitar botones
                if (
                    e.target.classList.contains('respuestaA') ||
                    e.target.classList.contains('respuestaB') ||
                    e.target.classList.contains('respuestaC') ||
                    e.target.classList.contains('respuestaD')
                ) {
                    boolRpta = true;
                    A.setAttribute('disabled', 'disabled');
                    B.setAttribute('disabled', 'disabled');
                    C.setAttribute('disabled', 'disabled');
                    D.setAttribute('disabled', 'disabled');
                }
                if (e.target.classList.contains('respuestaA')) {
                    preguntasCorrectas.push({
                        pregunta: datos[contadorPreguntas].pregunta,
                        respuesta_A: datos[contadorPreguntas].respuesta_A,
                        respuesta_B: datos[contadorPreguntas].respuesta_B,
                        respuesta_C: datos[contadorPreguntas].respuesta_C,
                        respuesta_D: datos[contadorPreguntas].respuesta_D,
                        respuesta_correcta: datos[contadorPreguntas].respuesta_correcta,
                        respuesta_seleccionada: datos[contadorPreguntas].respuesta_A,
                    });
                    //! Verificacion de pregunta correcta
                    if (datos[contadorPreguntas].respuesta_A == datos[contadorPreguntas].respuesta_correcta) {
                        A.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                        B.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        C.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        D.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        puntos += valorPuntosPorSegundo * tiempoRestante;
                        tiempoRestante = 0;
                        contadorPreguntas++;
                    } else {
                        A.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        switch (datos[contadorPreguntas].respuesta_correcta) {
                            case datos[contadorPreguntas].respuesta_B:
                                B.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                                C.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                D.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                break;
                            case datos[contadorPreguntas].respuesta_C:
                                B.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                C.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                                D.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                break;
                            case datos[contadorPreguntas].respuesta_D:
                                B.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                C.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                D.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                                break;

                            default:
                                break;
                        }
                        tiempoRestante = 0;
                        contadorPreguntas++;
                    }
                }
                if (e.target.classList.contains('respuestaB')) {
                    preguntasCorrectas.push({
                        pregunta: datos[contadorPreguntas].pregunta,
                        respuesta_A: datos[contadorPreguntas].respuesta_A,
                        respuesta_B: datos[contadorPreguntas].respuesta_B,
                        respuesta_C: datos[contadorPreguntas].respuesta_C,
                        respuesta_D: datos[contadorPreguntas].respuesta_D,
                        respuesta_correcta: datos[contadorPreguntas].respuesta_correcta,
                        respuesta_seleccionada: datos[contadorPreguntas].respuesta_B,
                    });
                    //! Verificacion de pregunta correcta
                    if (datos[contadorPreguntas].respuesta_B == datos[contadorPreguntas].respuesta_correcta) {
                        A.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        B.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                        C.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        D.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        puntos += valorPuntosPorSegundo * tiempoRestante;
                        tiempoRestante = 0;
                        contadorPreguntas++;
                    } else {
                        B.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        switch (datos[contadorPreguntas].respuesta_correcta) {
                            case datos[contadorPreguntas].respuesta_A:
                                A.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                                C.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                D.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                break;
                            case datos[contadorPreguntas].respuesta_C:
                                A.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                C.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                                D.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                break;
                            case datos[contadorPreguntas].respuesta_D:
                                A.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                C.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                D.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                                break;

                            default:
                                break;
                        }
                        tiempoRestante = 0;
                        contadorPreguntas++;
                    }
                }
                if (e.target.classList.contains('respuestaC')) {
                    preguntasCorrectas.push({
                        pregunta: datos[contadorPreguntas].pregunta,
                        respuesta_A: datos[contadorPreguntas].respuesta_A,
                        respuesta_B: datos[contadorPreguntas].respuesta_B,
                        respuesta_C: datos[contadorPreguntas].respuesta_C,
                        respuesta_D: datos[contadorPreguntas].respuesta_D,
                        respuesta_correcta: datos[contadorPreguntas].respuesta_correcta,
                        respuesta_seleccionada: datos[contadorPreguntas].respuesta_C,
                    });
                    //! Verificacion de pregunta correcta
                    if (datos[contadorPreguntas].respuesta_C == datos[contadorPreguntas].respuesta_correcta) {
                        A.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        B.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        C.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                        D.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        puntos += valorPuntosPorSegundo * tiempoRestante;
                        tiempoRestante = 0;
                        contadorPreguntas++;
                    } else {
                        C.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        switch (datos[contadorPreguntas].respuesta_correcta) {
                            case datos[contadorPreguntas].respuesta_A:
                                A.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                                B.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                D.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                break;
                            case datos[contadorPreguntas].respuesta_B:
                                A.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                B.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                                D.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                break;
                            case datos[contadorPreguntas].respuesta_D:
                                A.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                B.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                D.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                                break;

                            default:
                                break;
                        }
                        tiempoRestante = 0;
                        contadorPreguntas++;
                    }
                }
                if (e.target.classList.contains('respuestaD')) {
                    preguntasCorrectas.push({
                        pregunta: datos[contadorPreguntas].pregunta,
                        respuesta_A: datos[contadorPreguntas].respuesta_A,
                        respuesta_B: datos[contadorPreguntas].respuesta_B,
                        respuesta_C: datos[contadorPreguntas].respuesta_C,
                        respuesta_D: datos[contadorPreguntas].respuesta_D,
                        respuesta_correcta: datos[contadorPreguntas].respuesta_correcta,
                        respuesta_seleccionada: datos[contadorPreguntas].respuesta_D,
                    });
                    //! Verificacion de pregunta correcta
                    if (datos[contadorPreguntas].respuesta_D == datos[contadorPreguntas].respuesta_correcta) {
                        A.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        B.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        C.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        D.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                        puntos += valorPuntosPorSegundo * tiempoRestante;
                        tiempoRestante = 0;
                        contadorPreguntas++;
                    } else {
                        D.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        switch (datos[contadorPreguntas].respuesta_correcta) {
                            case datos[contadorPreguntas].respuesta_A:
                                A.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                                B.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                C.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                break;
                            case datos[contadorPreguntas].respuesta_B:
                                A.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                B.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                                C.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                break;
                            case datos[contadorPreguntas].respuesta_C:
                                A.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                B.innerHTML += '   <i class="bi bi-x-circle"></i>';
                                C.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                                break;

                            default:
                                break;
                        }
                        tiempoRestante = 0;
                        contadorPreguntas++;
                    }
                }
            }
            puntosJugador.textContent = 'Puntos: ' + puntos;
        });

        //* Cargar primera pregunta
        mostrarPregunta();
    });
