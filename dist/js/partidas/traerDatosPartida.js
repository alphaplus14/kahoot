async function traerDatosPartida(idPartida) {
    try {
        const response = await fetch(`../../controller/partidas/controllerDatosPartida.php?id_partida=${idPartida}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return {
                success: false,
                error: true,
                message: 'Error al conectar con el servidor.',
            };
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en traerDatosPartida:', error);
        return {
            success: false,
            error: true,
            message: 'Error inesperado.',
        };
    }
}

window.traerDatosPartida = traerDatosPartida;
