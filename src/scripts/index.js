let articulos = null;
let tableArticulos;
$(document).ready(function () {
  init();
});

const init = async () => {
  checkQuiebre();
  await getArticulosFromServer();
  configTable();
};

const getArticulosFromServer = async () => {
  try {
    const response = await axios.get(urlBase);
    articulos = response.data.data;
    //console.log(articulos);
    if (articulos) {
      setArticulosToTable(articulos);
    }
  } catch (error) {
    console.error(error);
  }
};

const setArticulosToTable = (articulos) => {
  let bodyArticulos = document.getElementById("tbodyArticulos");

  for (const articulo of articulos) {
    //console.log(articulo);
    let tr = document.createElement("tr");

    let tdId = document.createElement("td");
    tdId.innerText = articulo.id;
    tdId.setAttribute("class", "text-center");
    tr.appendChild(tdId);

    let tdImg = document.createElement("td");
    let innerImg = document.createElement("img");
    innerImg.setAttribute("src", `${urlImg}/${articulo.img}`);
    innerImg.setAttribute("alt", `${articulo.img}`);
    innerImg.setAttribute("class", "imagen-tamano");
    tdImg.appendChild(innerImg);
    tr.appendChild(tdImg);

    let tdDesc = document.createElement("td");
    tdDesc.innerText = articulo.descripcion.toUpperCase();
    tr.appendChild(tdDesc);

    let tdProv = document.createElement("td");
    tdProv.setAttribute("class", "text-center");
    tdProv.innerText = articulo.prov_nombre.toUpperCase();
    tr.appendChild(tdProv);

    let tdBarras = document.createElement("td");
    tdBarras.setAttribute("class", "text-center");
    let barrasStrong = document.createElement("strong");
    barrasStrong.innerText = articulo.barras;
    tdBarras.appendChild(barrasStrong);
    tr.appendChild(tdBarras);

    let tdSku = document.createElement("td");
    let tdEm = document.createElement("em");
    tdEm.innerText = articulo.sku;
    tdSku.appendChild(tdEm);
    tr.appendChild(tdSku);

    let tdStock = document.createElement("td");
    tdStock.setAttribute("class", "text-center");
    let tdSpanStock = document.createElement("span");
    tdSpanStock.setAttribute(
      "class",
      "badge badge-pill badge-success custom-badge-verde"
    );
    let tdStrongStock = document.createElement("strong");
    tdStrongStock.innerText = articulo.stock;
    tdSpanStock.appendChild(tdStrongStock);
    tdStock.appendChild(tdSpanStock);
    tr.appendChild(tdStock);

    let tdReserva = document.createElement("td");
    tdReserva.setAttribute("class", "text-center");
    let tdSpanReserva = document.createElement("span");
    tdSpanReserva.setAttribute(
      "class",
      "badge badge-pill badge-success  custom-badge-reserva"
    );
    let tdStrongReserva = document.createElement("strong");
    tdStrongReserva.innerText = articulo.reserva;
    tdSpanReserva.appendChild(tdStrongReserva);
    tdReserva.appendChild(tdSpanReserva);
    tr.appendChild(tdReserva);

    let tdBotones = document.createElement("td");
    tdBotones.setAttribute("class", "text-center");

    let tdDivBotones = document.createElement("div");
    tdDivBotones.setAttribute("class", "btn-container");
    tdBotones.appendChild(tdDivBotones);

    let tdDivBtnVer = document.createElement("button");
    tdDivBtnVer.setAttribute(
      "class",
      "btnVer btn-custom-size2 alert alert-primary btn-alert-primary"
    );

    let tdIconVer = document.createElement("i");
    tdIconVer.setAttribute("class", "far fa-eye");
    tdDivBtnVer.appendChild(tdIconVer);
    tdDivBotones.appendChild(tdDivBtnVer);

    let tdDivBtnEdit = document.createElement("button");
    tdDivBtnEdit.setAttribute(
      "class",
      "btnEdit btn-custom-size2 alert alert-warning btn-alert-warning"
    );
    let tdIconEdit = document.createElement("i");
    tdIconEdit.setAttribute("class", "fas fa-pen");
    tdDivBtnEdit.appendChild(tdIconEdit);
    tdDivBotones.appendChild(tdDivBtnEdit);

    let tdDivBtnDel = document.createElement("button");
    tdDivBtnDel.setAttribute(
      "class",
      "btn-custom-size2 alert alert-danger btn-alert-danger list-delete"
    );
    let tdIconDel = document.createElement("i");
    tdIconDel.setAttribute("class", "fas fa-trash-alt");
    tdDivBtnDel.appendChild(tdIconDel);
    tdDivBotones.appendChild(tdDivBtnDel);

    tr.appendChild(tdBotones);
    bodyArticulos.appendChild(tr);
  }

  addListeners();
};

const addListeners = () => {
  $("#tbodyArticulos td .btnVer").click(async function (e) {
    var currentRow = $(this).closest("tr");
    var data = $("#articulos").DataTable().row(currentRow).data();
    const id = data[0];
    //console.log("id art ver", id);
    await getArticuloById(id);

    // verArticulo.show();
  });

  $("#tbodyArticulos td .list-delete").click(function (e) {
    var currentRow = $(this).closest("tr");
    var data = $("#articulos").DataTable().row(currentRow).data();
    const id = data[0];
    swal({
      title: "Estas seguro?",
      text: "El item va a ser eliminado",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await deleteArticulo(id);
        swal({
          title: "Eliminado",
          text: "El item fue correctamente eliminado",
          icon: "success",
        });
      } else {
        swal("El item no fue eliminado!");
      }
    });
  });

  $("#articulos").on("click", ".btnEdit", function (e) {
    e.preventDefault();
    var currentRow = $(this).closest("tr");
    var data = $("#articulos").DataTable().row(currentRow).data();
    const id = data[0];
    const params = new URLSearchParams();
    params.append("id", id);
    const queryString = params.toString();
    const urlAddArticulo = "../pages/form-addon.html";
    const url = `${urlAddArticulo}?${queryString}`;
    window.location.href = url;
  });
};

const configTable = () => {
  $("#articulos").DataTable({
    lengthMenu: [
      [5, 10, 25, 50],
      [5, 10, 25, 50],
    ], // Opciones de filas por página
    pageLength: 5, // Muestra 5 entradas por defecto
    columnDefs: [
      {
        target: 0,
        visible: false,
      },
      { targets: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
      { orderable: false, targets: [1, 7, 8] },
    ],
    order: [[0, "asc"]],
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
const getArticuloById = async (idArticulo) => {
  axios
    .get(`${urlBase}/${idArticulo}`)
    .then(async function (response) {
      // manejar respuesta exitosa
      if (response.data.result === "ok") {
        const articulo = response.data.data;
        setModalInfo(articulo);
      }
    })
    .catch(function (error) {
      console.log("error"); // manejar error
      console.log(error);
    });
};

const deleteArticulo = async (idBorrar) => {
  await axios.delete(`${urlBase}/${idBorrar}`);
  redirectToPage("index.html");
};

const checkQuiebre = (params) => {
  var quiebre = new bootstrap.Modal(document.getElementById("quiebre"));
  //quiebre.show();
};

const setModalInfo = (articulo) => {
  const {
    id,
    barras,
    descripcion,
    img,
    reserva,
    sku,
    stock,
    merma,
    nombre_proveedor,
  } = articulo;
  $("#ver-info #mdDesc").text(descripcion);
  $("#ver-info #mdBarras").text(barras);
  $("#ver-info #mdStock").text(stock);
  $("#ver-info #mdReserva").text(reserva);
  $("#ver-info #mdMerma").text(merma);
  $("#ver-info #mdBarras").text(barras);
  $("#ver-info #mdSku").text(sku);
  $("#ver-info #mdProv").text(nombre_proveedor);
  $("#ver-info #mdImg").attr("src", `${urlImg}/${img}`);
  $("#ver-info #mdImg").attr("alt", `${img}`);

  $("#ver-info .mdEdit").click(function (e) {
    const params = new URLSearchParams();
    params.append("id", id);
    const queryString = params.toString();
    const urlAddArticulo = "pages/form-addon.html";
    const url = `${urlAddArticulo}?${queryString}`;
    window.location.href = url;
  });

  $("#ver-info .mdDel").click(async function (e) {
    await deleteArticulo(id);
  });

  let modalArticulo = new bootstrap.Modal(document.getElementById("ver-info"));
  modalArticulo.show();
};

function redirectToPage(url) {
  window.location.href = url;
}
