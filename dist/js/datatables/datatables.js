$('#tablaAdministradores').DataTable({
    responsive: true,
    autoWidth: false,
    pageLength: 5,
    lengthMenu: [5, 10, 20, 50,20],
    language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
    },

    columnDefs: [
        { targets: 0, width: '60px' }, // ID
        { targets: 3, width: '100px' }, // ID
        { targets: 4, orderable: false, width: '140px' }, // Acciones
    ],
});
