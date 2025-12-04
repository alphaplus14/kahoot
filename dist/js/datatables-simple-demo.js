window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const tablaClientes = document.getElementById('tablaClientes');
    if (tablaClientes) {
        new simpleDatatables.DataTable(tablaClientes, {
            labels: {
                placeholder: "Buscar...",
                perPage: "registros por página", 
                noRows: "No se encontraron resultados",
                info: "Mostrando {start} a {end} de {rows} registros",
                noResults: "No hay resultados para tu búsqueda"
            },
        });
    }
});
window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const tablaEmpleados = document.getElementById('tablaEmpleados');
    if (tablaEmpleados) {
        new simpleDatatables.DataTable(tablaEmpleados, {
            labels: {
                placeholder: "Buscar...",
                perPage: "registros por página", 
                noRows: "No se encontraron resultados",
                info: "Mostrando {start} a {end} de {rows} registros",
                noResults: "No hay resultados para tu búsqueda"
            },
        });
    }
});

