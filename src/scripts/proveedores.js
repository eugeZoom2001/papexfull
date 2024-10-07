$(document).ready(function () {
  init();
});

const init = async () => {
  await getProveedoresFromServer();
  configTable();
};

const getProveedoresFromServer = async () => {
  try {
    const response = await axios.get(urlProveedores);
    proveedores = response.data.data;
    //console.log(articulos);
    if (proveedores) {
      setProveedoresToTable(proveedores);
    }
  } catch (error) {
    console.error(error);
  }
};

const setProveedoresToTable = (proveedores) => {
  let bodyProveedores = document.getElementById("tbodyProveedores");

  for (const proveedor of proveedores) {
    let tr = document.createElement("tr");
    const {
      prov_id: id,
      prov_nombre: nombre,
      prov_referente: referente,
      prov_telefono: telefono,
      prov_direccion: direccion,
      prov_email: email,
    } = proveedor;

    let tdId = document.createElement("td");
    tdId.innerText = id;
    tdId.setAttribute("class", "text-center");
    tr.appendChild(tdId);

    let tdNombre = document.createElement("td");
    tdNombre.setAttribute("class", "text-center");
    tdNombre.innerText = nombre;
    tr.appendChild(tdNombre);

    if (referente) {
      let tdReferente = document.createElement("td");
      tdReferente.setAttribute("class", "text-center");
      let tdStrongRef = document.createElement("strong");
      tdStrongRef.innerText = referente;
      tdReferente.appendChild(tdStrongRef);
      tr.appendChild(tdReferente);
    }

    if (telefono) {
      let tdTelefono = document.createElement("td");
      tdTelefono.setAttribute("class", "text-center");
      let tdTelem = document.createElement("em");
      tdTelem.innerText = telefono;
      tdTelefono.appendChild(tdTelem);
      tr.appendChild(tdTelefono);
    }

    let tdDireccion = document.createElement("td");
    tdDireccion.innerText = direccion;
    tr.appendChild(tdDireccion);

    let tdEmail = document.createElement("td");
    tdEmail.innerText = email;
    tr.appendChild(tdEmail);

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
      " btn-custom-size2 alert alert-danger btn-alert-danger list-delete"
    );
    let tdIconDel = document.createElement("i");
    tdIconDel.setAttribute("class", "fas fa-trash-alt");
    tdDivBtnDel.appendChild(tdIconDel);
    tdDivBotones.appendChild(tdDivBtnDel);

    tr.appendChild(tdBotones);
    bodyProveedores.appendChild(tr);
    // }
  }
  addListeners();
};

const addListeners = () => {
  $("#tproveedores").on("click", ".btnVer", (e) => {
    e.preventDefault();
    let verProveedor = new bootstrap.Modal(
      document.getElementById("modalProveedor")
    );
    let currentRow = $(e.target).closest("tr");
    let data = $("#tproveedores").DataTable().row(currentRow).data();
    //console.log(data);
    const id = data[0];
    const nombre = data[1];
    const referente = $.parseHTML(data[2])[0].innerHTML;
    const telefono = $.parseHTML(data[3])[0].innerHTML;
    const direccion = data[4];
    const email = data[5];

    const prov = { id, nombre, referente, telefono, direccion, email };
    //let referenteHtml = $.parseHTML(data[2]);
    //console.log(referenteHtml);
    //let referente = referenteHtml[0].innerHTML; //ok
    ///console.log(referente);
    setModalInfo(prov);
  });

  $("#tbodyProveedores td .list-delete").click(function (e) {
    var currentRow = $(this).closest("tr");
    var id = $("#tproveedores").DataTable().row(currentRow).data()[0];

    swal({
      title: "Estas seguro?",
      text: "El item va a ser eliminado",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await deleteProveedor(id);
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

  $("#tproveedores").on("click", ".btnEdit", function (e) {
    e.preventDefault();
    var currentRow = $(this).closest("tr");
    var id = $("#tproveedores").DataTable().row(currentRow).data()[0];
    const params = new URLSearchParams();
    params.append("id", id);
    const queryString = params.toString();
    const urlAddProv = "../pages/nuevoprov.html";
    const url = `${urlAddProv}?${queryString}`;
    window.location.href = url;
  });

  $("#modalProveedor").on("click", ".btnModalEdit", function (e) {
    let id = $("#modalProveedor #spId").text();
    const params = new URLSearchParams();
    params.append("id", id);
    const queryString = params.toString();
    const urlAddProv = "../pages/nuevoprov.html";
    const url = `${urlAddProv}?${queryString}`;
    window.location.href = url;
  });
};

const configTable = () => {
  $("#tproveedores").DataTable({
    lengthMenu: [
      [5, 10, 25, 50],
      [5, 10, 25, 50],
    ], // Opciones dede filas por página
    pageLength: 5, // Muestra 5 entradas por defecto
    columnDefs: [
      {
        target: 4,
        visible: false,
      },
      {
        target: 5,
        visible: false,
      },
      { targets: [0, 1, 2, 3, 4, 5, 6] },
      { orderable: false, targets: [4] },
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

const deleteProveedor = async (idBorrar) => {
  await axios.delete(`${urlProveedores}/${idBorrar}`);
  redirectToPage("proveedores.html");
};

const setModalInfo = (proveedor) => {
  const { id, nombre, referente, telefono, direccion, email } = proveedor;
  $("#spId").text(id);
  $("#spNombre").text(nombre);
  $("#spReferente").text(referente);
  $("#spTelefono").text(telefono);
  $("#spDireccion").text(direccion);
  $("#spEmail").text(email);
  var provModal = new bootstrap.Modal(
    document.getElementById("modalProveedor")
  );
  provModal.show();
};

function redirectToPage(url) {
  window.location.href = url;
}
