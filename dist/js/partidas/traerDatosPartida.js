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
                status: response.status,
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

async function DatosRankingGlobal() {
    try {
        const response = await fetch(`../../controller/partidas/controllerDatosRankingGlobal.php`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
        });

        if (!response.ok) {
            return {
                success: false,
                error: true,
                message: 'Error al conectar con el servidor.',
            };
        }

        const data = await response.json();

        if (data.error) {
            return {
                success: false,
                error: true,
                message: data.message || 'Error desconocido del servidor.',
                status: response.status,
            };
        }
        // Si no hay jugadores en el ranking
        if (!data.data?.jugadores || data.data.jugadores.length === 0) {
            return {
                success: true,
                data: { jugadores: [] },
                message: 'No hay jugadores en el ranking aún.',
            };
        }

        return data;
    } catch (error) {
        console.error('Error en DatosRankingGlobal:', error);
        return {
            success: false,
            error: true,
            message: 'Error inesperado.',
        };
    }
}

window.DatosRankingGlobal = DatosRankingGlobal;
