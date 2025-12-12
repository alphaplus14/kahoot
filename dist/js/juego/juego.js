fetch('../../controller/jugadores/controllerJugadorCargarPreguntas.php')
    .then((response) => response.json())
    .then((datos) => {
        console.log(datos);
        const pregunta = document.querySelector('#pregunta');
        const A = document.querySelector('.respuestaA');
        const B = document.querySelector('.respuestaB');
        const C = document.querySelector('.respuestaC');
        const D = document.querySelector('.respuestaD');
        const contador = document.querySelector('#contador'); // ← elemento HTML del contador
        const puntosJugador = document.querySelector('#puntos');
        let i = 0; // índice de pregunta
        const segundos = 5; // duración por pregunta
        let tiempoRestante = segundos;
        let intervaloContador;
        let contadorPreguntas = 0;
        let puntos = 0;
        function mostrarPregunta() {
            if (i >= datos.length) {
                setInterval(() => {
                    window.location.href = '#';
                }, 2000);
            } else {
                pregunta.textContent = datos[i].pregunta;
                A.textContent = 'A: ' + datos[i].respuesta_A;
                B.textContent = 'B: ' + datos[i].respuesta_B;
                C.textContent = 'C: ' + datos[i].respuesta_C;
                D.textContent = 'D: ' + datos[i].respuesta_D;
                // Pasar a la siguiente pregunta
                i++;
                iniciarContador();
            }
        }
        function iniciarContador() {
            contador.textContent = 'Tiempo Restante: ' + tiempoRestante;
            // limpiar contador anterior
            clearInterval(intervaloContador);
            intervaloContador = setInterval(() => {
                if (tiempoRestante <= 0) {
                    // 1. Detener el intervalo
                    clearInterval(intervaloContador);
                    contador.textContent = 'Tiempo Restante: ' + tiempoRestante;
                    // 2. Esperar 2 segundos antes de mostrar pregunta
                    setTimeout(() => {
                        tiempoRestante = segundos; // reiniciar tiempo
                        mostrarPregunta(); // 3. Mostrar pregunta
                    }, 5000);
                } else {
                    tiempoRestante--;
                    contador.textContent = 'Tiempo Restante: ' + tiempoRestante;
                }
            }, 1000);
        }
        const form = document.querySelector('.formPreguntas');
        form.addEventListener('click', (e) => {
            if (contadorPreguntas < datos.length) {
                if (e.target.classList.contains('respuestaA')) {
                    if (datos[contadorPreguntas].respuesta_A == datos[contadorPreguntas].respuesta_correcta) {
                        A.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                        B.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        C.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        D.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        puntos += 100;
                        tiempoRestante = 0;
                        contadorPreguntas++;
                    } else {
                        tiempoRestante = 0;
                        contadorPreguntas++;
                    }
                }
                if (e.target.classList.contains('respuestaB')) {
                    if (datos[contadorPreguntas].respuesta_B == datos[contadorPreguntas].respuesta_correcta) {
                        A.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        B.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                        C.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        D.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        puntos += 100;
                        tiempoRestante = 0;
                        contadorPreguntas++;
                    } else {
                        tiempoRestante = 0;
                        contadorPreguntas++;
                    }
                }
                if (e.target.classList.contains('respuestaC')) {
                    if (datos[contadorPreguntas].respuesta_C == datos[contadorPreguntas].respuesta_correcta) {
                        A.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        B.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        C.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                        D.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        puntos += 100;
                        tiempoRestante = 0;
                        contadorPreguntas++;
                    } else {
                        tiempoRestante = 0;
                        contadorPreguntas++;
                    }
                }
                if (e.target.classList.contains('respuestaD')) {
                    if (datos[contadorPreguntas].respuesta_D == datos[contadorPreguntas].respuesta_correcta) {
                        A.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        B.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        C.innerHTML += '   <i class="bi bi-x-circle"></i>';
                        D.innerHTML += '   <i class="bi bi-check2-circle"></i>';
                        puntos += 100;
                        tiempoRestante = 0;
                        contadorPreguntas++;
                    } else {
                        tiempoRestante = 0;
                        contadorPreguntas++;
                    }
                }
            }
            puntosJugador.textContent = 'Puntos: ' + puntos;
        });
        // Mostrar primera pregunta
        mostrarPregunta();
    });
