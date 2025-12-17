$('#tablaAdministradores').DataTable({
    responsive: true,
    autoWidth: false,
    pageLength: 10,
    lengthMenu: [5, 10, 20, 50, 100],
    language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
    },

    columnDefs: [
        { targets: 0, width: '30px' }, // ID
        { targets: 3, width: '100px' }, // ID
        { targets: 4, orderable: false, width: '140px' }, // Acciones
    ],
});
$('#tablaCategorias').DataTable({
    responsive: true,
    autoWidth: false,
    pageLength: 10,
    lengthMenu: [5, 10, 20, 50, 100],
    language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
    },

    columnDefs: [
        { targets: 0, width: '30px' }, // ID
        { targets: 3, width: '100px' }, // ID
        { targets: 4, orderable: false, width: '140px' }, // Acciones
    ],
});

$('#tablaHistorialPartida').DataTable({
    responsive: true,
    autoWidth: false,
    pageLength: 10,
    order: [[0, 'desc']],
    lengthMenu: [5, 10, 20, 50, 100],
    language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
    },

    columnDefs: [
        { targets: 0, width: '30px' }, // ID
        { targets: 3, width: '100px' }, // ID
        { targets: 4, orderable: false, width: '140px' }, // Acciones
    ],
});
$('#tablaCuestionarios').DataTable({
    responsive: true,
    autoWidth: false,
    pageLength: 10,
    lengthMenu: [5, 10, 20, 50, 100],
    language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
    },

    columnDefs: [
        { targets: 0, width: '30px' }, // ID
        { targets: 1, width: '300px' }, // Preguntas
        { targets: 2, width: '100px' }, // Respuestas
        { targets: 3, width: '100px' }, // Categoria
        { targets: 4, width: '100px' }, // Estado
        { targets: 5, width: '90px' }, // Acciones
    ],
});
