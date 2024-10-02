let articulos = null
$(document).ready(function () {
  init()
});

const init = async () => {
  checkQuiebre()
  await getArticulosFromServer()
  configTable()
}

const getArticulosFromServer = async () => {
  try {
    const response = await axios.get(urlBase);
    articulos = response.data.data
    //console.log(articulos);
    if (articulos) {
      setArticulosToTable(articulos)
    }
  } catch (error) {
    console.error(error);
  }
}

const setArticulosToTable = (articulos) => {
  for (const articulo of articulos) {
    console.log(articulo);
    let tr = document.createElement("tr")

    let tdId = document.createElement("td")
    tdId.innerText = articulo.id
    tr.appendChild(tdId)

    let tdImg = document.createElement("td")
    let innerImg = document.createElement("img")
    innerImg.setAttribute("src", `${urlImg}/${articulo.img}`)
    innerImg.setAttribute("alt", `${articulo.img}`)
    innerImg.setAttribute("class", "imagen-tamano")
    tdImg.appendChild(innerImg)
    tr.appendChild(tdImg)

    let tdDesc = document.createElement("td")
    tdDesc.innerText = articulo.descripcion.toUpperCase()
    tr.appendChild(tdDesc)

    let tdProv = document.createElement("td")
    tdProv.setAttribute("class", "text-center")
    tdProv.innerText = articulo.prov_nombre.toUpperCase()
    tr.appendChild(tdProv)

    let tdBarras = document.createElement("td")
    tdBarras.setAttribute("class", "text-center")
    let barrasStrong = document.createElement("strong")
    barrasStrong.innerText = articulo.barras
    tdBarras.appendChild(barrasStrong)
    tr.appendChild(tdBarras)

    let tdSku = document.createElement("td")
    let tdEm = document.createElement("em")
    tdEm.innerText = articulo.sku
    tdSku.appendChild(tdEm)
    tr.appendChild(tdSku)

    let tdStock = document.createElement("td")
    tdStock.setAttribute("class", "text-center")
    let tdSpanStock = document.createElement("span")
    tdSpanStock.setAttribute("class", "badge badge-pill badge-success  custom-badge-reserva")
    let tdStrongStock = document.createElement("strong")
    tdStrongStock.innerText = articulo.stock.toString()
    tdSpanStock.appendChild(tdStrongStock)
    tdStock.appendChild(tdSpanStock)
    tr.appendChild(tdStock)

    let tdReserva = document.createElement("td")
    tdReserva.setAttribute("class", "text-center")
    let tdSpanReserva = document.createElement("span")
    tdSpanReserva.setAttribute("class", "badge badge-pill badge-success  custom-badge-reserva")
    let tdStrongReserva = document.createElement("strong")
    tdStrongReserva.innerText = articulo.reserva.toString()
    tdSpanReserva.appendChild(tdStrongReserva)
    tdReserva.appendChild(tdSpanReserva)
    tr.appendChild(tdReserva)

    let tdBotones = document.createElement("td")
    tdBotones.setAttribute("class", "text-center")
    let tdDivBotones = document.createElement("td")
    tdDivBotones.setAttribute("class", "btn-container")
    tdBotones.appendChild()




  }


}





const checkQuiebre = (params) => {
  var quiebre = new bootstrap.Modal(document.getElementById("quiebre"));
  //quiebre.show();
}


const configTable = () => {
  $("#articulos").DataTable({
    lengthMenu: [
      [5, 10, 25, 50],
      [5, 10, 25, 50],
    ], // Opciones de filas por página
    pageLength: 5, // Muestra 5 entradas por defecto
    columnDefs: [
      { target: 0, visible: false },
      { targets: [1, 2, 3, 4, 5, 6, 7] },
      { orderable: false, targets: [1, 7] },
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
}


function redirectToPage() {
  window.location.href = "pages/form-addon.html"; // Cambia esta URL según tu estructura de proyecto
}
