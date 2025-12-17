// #region //* Funcion Ver Detalle Partida con Jugadores
//TODO Inicio Funcion Ver Detalle Partida con Jugadores
async function verDetallePartida(idPartida) {
    try {
        const res = await traerDatosPartida(idPartida);
        // Verificar si hubo error
        if (res.error || !res.success) {
            Swal.fire('Sin resultados', res.message || 'No se encontraron datos de la partida.', 'warning');
            return;
        }
        const partida = res.data.partida;
        const jugadores = res.data.jugadores;
        let info = `
            <div class="mb-3 text-start">
                <p><strong>PIN:</strong> <span class="badge bg-primary fs-6">${partida.pin_partida || 'N/A'}</span></p>
                <p><strong>Estado:</strong> <span class="badge ${partida.estado_partida === 'Terminado' ? 'bg-success' : 'bg-secondary'}">${partida.estado_partida || 'N/A'}</span></p>
                <p><strong>Fecha de Partida:</strong> ${partida.fecha_partida || 'N/A'}</p>
                <p><strong>Total Jugadores:</strong> ${jugadores.length}</p>
            </div>
            <hr>
        `;
        let tabla = `
            <table class="table table-striped align-middle" style="width:100%; text-align:left;">
                <thead class="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Puntuación</th>
                        <th>Ficha</th>
                    </tr>
                </thead>
                <tbody>
        `;
        // Iterar sobre los jugadores
        jugadores.forEach((jugador, index) => {
            tabla += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${jugador.nombre_jugador || 'Anónimo'}</td>
                    <td><span class="badge bg-info">${jugador.puntaje_jugador || 0} pts</span></td>
                    <td><span class="badge bg-danger">${jugador.ficha_jugador || 'Desconocido'}</span></td>
                </tr>
            `;
        });
        tabla += `
                </tbody>
            </table>
        `;
        Swal.fire({
            title: `<i class="bi bi-controller"></i> Detalle de la Partida #${idPartida}`,
            html: info + tabla,
            icon: 'info',
            confirmButtonText: '<i class="bi bi-check-circle"></i> Cerrar',
            confirmButtonColor: '#3085d6',
            width: 1000,
            customClass: {
                popup: 'text-start',
            },
        });
    } catch (error) {
        console.error('Error al obtener detalle:', error);
        Swal.fire('Error', 'No se pudo obtener la información de la partida.', 'error');
    }
}
window.verDetallePartida = verDetallePartida;
//TODO Fin Funcion Ver Detalle Partida con Jugadores
// #endregion

// #region //* Funcion Ver ranking global
//TODO Inicio Funcion Ver el ranking global
async function verRankingGlobal() {
    try {
        const res = await DatosRankingGlobal();

        // Verificar si hubo error
        if (res.error || !res.success) {
            Swal.fire('Sin resultados', res.message || 'No se pudo cargar el ranking.', 'warning');
            return;
        }

        const jugadores = res.data.jugadores;

        // Validar que haya jugadores
        if (!jugadores || jugadores.length === 0) {
            Swal.fire('Ranking vacío', 'Aún no hay jugadores en el ranking.', 'info');
            return;
        }

        let info = `
            <div class="mb-3 text-center">
                <h5 class="text-primary">
                    <i class="bi bi-trophy-fill"></i> Top ${jugadores.length} Mejores Jugadores
                </h5>
                <p class="text-muted">Clasificación por puntuación total</p>
            </div>
            <hr>
        `;

        let tabla = `
            <table class="table table-hover align-middle" style="width:100%; text-align:left;">
                <thead class="table-dark">
                    <tr>
                        <th style="width: 90px;" class="text-center">Posición</th>
                        <th>Nombre</th>
                        <th class="text-center">Puntuación</th>
                        <th class="text-center">Ficha</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // Iterar sobre los jugadores
        jugadores.forEach((jugador, index) => {
            // Medallas para top 3
            let posicion = '';
            if (index === 0) {
                posicion = '<span class="fs-4">🥇</span>';
            } else if (index === 1) {
                posicion = '<span class="fs-4">🥈</span>';
            } else if (index === 2) {
                posicion = '<span class="fs-4">🥉</span>';
            } else {
                posicion = `<span class="badge bg-secondary">${index + 1}</span>`;
            }

            // Clase de fila para destacar top 3
            const filaClase = index < 3 ? 'table-warning' : '';

            tabla += `
                <tr class="${filaClase}">
                    <td class="text-center">${posicion}</td>
                    <td><strong>${jugador.nombre_jugador || 'Anónimo'}</strong></td>
                    <td class="text-center">
                        <span class="badge bg-primary fs-6">${jugador.puntaje_jugador || 0} pts</span>
                    </td>
                    <td class="text-center">
                        <span class="badge bg-danger">${jugador.ficha_jugador || '-'}</span>
                    </td>
                </tr>
            `;
        });

        tabla += `
                </tbody>
            </table>
        `;

        Swal.fire({
            title: '<i class="bi bi-globe text-warning"></i> Ranking Global',
            html: info + tabla,
            confirmButtonText: '<i class="bi bi-x-circle"></i> Cerrar',
            confirmButtonColor: '#3085d6',
            width: 900,
            customClass: {
                popup: 'text-start',
            },
            showClass: {
                popup: 'animate__animated animate__fadeInDown',
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
            },
        });
    } catch (error) {
        console.error('Error al obtener ranking:', error);
        Swal.fire('Error', 'No se pudo cargar el ranking global.', 'error');
    }
}
// #endregion
