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
                <p><strong>Estado:</strong> <span class="badge ${partida.estado_partida === 'Activo' ? 'bg-success' : 'bg-secondary'}">${partida.estado_partida || 'N/A'}</span></p>
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
                    <td><span class="badge ${jugador.ficha_jugador === 'Conectado' ? 'bg-success' : 'bg-danger'}">${jugador.ficha_jugador || 'Desconocido'}</span></td>
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
