$(document).ready(function () {
  init();
});

const init = async () => {
  configTable();
  addListeners();
};

const addListeners = () => {
  $("#proveedores .btnEdit").click((e) => {
    console.log("edito proveedor");
  });
  $("#proveedores .btnDelete").click((e) => {
    console.log("borro proveedor");
  });
  $("#proveedores .btnVer").click((e) => {
    var verProv = new bootstrap.Modal(
      document.getElementById("modalProveedor")
    );
    verProv.show();
    //console.log("abroProveedor proveedor");
  });
};

const configTable = () => {
  $("#proveedores").DataTable({
    lengthMenu: [
      [5, 10, 25, 50],
      [5, 10, 25, 50],
    ], // Opciones de filas por página
    pageLength: 5, // Muestra 5 entradas por defecto
    columnDefs: [
      { targets: [0, 1, 2, 3, 4] },
      { orderable: false, targets: [4] },
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
};

const getProveedores = async () => {};

function redirectToPage() {
  window.location.href = "nuevoprov.html"; // Cambia esta URL según tu estructura de proyecto
}
