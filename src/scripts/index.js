function redirectToPage() {
  window.location.href = "pages/form-addon.html"; // Cambia esta URL según tu estructura de proyecto
}
$(document).ready(function () {
  var quiebre = new bootstrap.Modal(document.getElementById("quiebre"));
  //quiebre.show();
});

$("#articulos").DataTable({
  lengthMenu: [
    [5, 10, 25, 50],
    [5, 10, 25, 50],
  ], // Opciones de filas por página
  pageLength: 5, // Muestra 5 entradas por defecto
  columnDefs: [
    { targets: [0, 1, 2, 3, 4, 5, 6, 7] },
    { orderable: false, targets: [0, 7] },
  ],
  order: [[1, "asc"]],
  language: {
    lengthMenu: "Mostrar _MENU_ entradas",
    zeroRecords: "No se encontraron resultados",
    info: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
    infoEmpty: "Mostrando 0 a 0 de 0 entradas",
    infoFiltered: "(filtrado de _MAX_ entradas totales)",
    search: "Buscar:",
    paginate: {
      first: "Primero",
      last: "Último",
      next: ">>",
      previous: "<<",
    },
  },
});

function redirectToPage() {
  window.location.href = "pages/form-addon.html"; // Cambia esta URL según tu estructura de proyecto
}
