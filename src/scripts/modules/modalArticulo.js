let id_actual = null;
let motivo_merma = "Motivo de la merma";
let movimientos = null;
let mermas = null;
let proveedor_actual = null;

export const makeModal = async (id_art) => {
  //console.log("se carga el modal");
  motivo_merma = "Motivo de la merma";
  id_actual = id_art;

  await getArticuloById(id_actual);
  getMomimientosById(id_actual);
};

const getArticuloById = async (idArticulo) => {
  axios
    .get(`${urlBase}/${idArticulo}`)
    .then(async function (response) {
      // manejar respuesta exitosa
      if (response.data.result === "ok") {
        const articulo = response.data.data;
        proveedor_actual = articulo.id_proveedor;

        // console.log(articulo);
        setModalInfo(articulo);
      }
    })
    .catch(function (error) {
      console.log("error"); // manejar error
      console.log(error);
    });
};

const getMomimientosById = (idArticulo) => {
  axios
    .get(`${urlMovimientos}/${idArticulo}`)
    .then(async function (response) {
      // manejar respuesta exitosa
      if (response.data.result === "ok") {
        movimientos = [...response.data.data];
        // console.log("movimientos");
        // console.log(movimientos);
        getMermas(movimientos);
      }
    })
    .catch(function (error) {
      console.log("error", error); // manejar error
    });
};

const getMermas = (movimientos) => {
  //console.log("mermas movimientos", movimientos);
  mermas = [...movimientos.filter((mov) => mov.mov_tipo === "merma")];
  // console.log("mermas", mermas);

  setTablaMovimientos(movimientos);
  setTablaMermas(mermas);
};

const setTablaMermas = (mermas) => {
  let tbodyMermas = document.getElementById("body_mermas");
  mermas.forEach((merma, idx) =>
    agregarItemTablaMermas(merma, idx, tbodyMermas, false)
  );
  mermas = [];
};

const setTablaMovimientos = (movimientos) => {
  let tbodyMovimientos = document.getElementById("body_mov");
  movimientos.forEach((mov, idx) =>
    agregarItemTablaMovimientos(mov, idx, tbodyMovimientos, false)
  );
  movimientos = [];
};

const agregarItemTablaMovimientos = (mov, idx = -1, body, prepend = false) => {
  let prefix = "-";
  let motivo = "merma";
  let cls = "table-danger";
  if (mov.mov_tipo === "alta") {
    prefix = "+";
    motivo = "Ingreso en stock";
    cls = "table-success";
  } else if (mov.mov_tipo === "venta") {
    motivo = "Venta";
    cls = "table-primary";
  }

  let trMov = document.createElement("tr");
  trMov.setAttribute("class", cls);

  let thCant = document.createElement("th");
  thCant.setAttribute("class", "text-body");

  thCant.innerHTML = prefix + mov.mov_cantidad.toString();
  trMov.appendChild(thCant);

  let tdMotivo = document.createElement("td");
  tdMotivo.setAttribute("class", "text-body");
  let tdStrong = document.createElement("strong");
  tdStrong.innerText = motivo;
  tdMotivo.appendChild(tdStrong);
  trMov.appendChild(tdMotivo);

  let tdProv = document.createElement("td");
  tdProv.setAttribute("class", "text-body");
  let tdStrongProv = document.createElement("strong");
  tdStrongProv.innerText = mov.mov_proveedor;
  tdProv.appendChild(tdStrongProv);
  trMov.appendChild(tdProv);

  let tdFecha = document.createElement("td");
  tdFecha.setAttribute("class", "text-body");
  tdFecha.innerText = luxon.DateTime.fromISO(mov.mov_fecha, {
    setZone: true,
  }).toFormat("dd/MM/yyyy");

  trMov.appendChild(tdFecha);

  if (prepend) body.prepend(trMov);
  else body.append(trMov);
};

const agregarItemTablaMermas = (merma, idx = -1, body, prepend = false) => {
  let trMerma = document.createElement("tr");
  let thMermas = document.createElement("th");
  thMermas.setAttribute("scope", "row");
  thMermas.innerHTML = (idx + 1).toString();
  trMerma.appendChild(thMermas);

  let tdMotivo = document.createElement("td");
  tdMotivo.innerText = merma.mov_desc;
  trMerma.appendChild(tdMotivo);

  let tdFecha = document.createElement("td");
  tdFecha.innerText = luxon.DateTime.fromISO(merma.mov_fecha, {
    setZone: true,
  }).toFormat("dd/MM/yyyy");

  trMerma.appendChild(tdFecha);

  if (prepend) body.prepend(trMerma);
  else body.append(trMerma);
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

  $("#ver-info .mdEdit").on("click", function (e) {
    const params = new URLSearchParams();
    params.append("id", id);
    const queryString = params.toString();
    const urlAddArticulo = "pages/form-addon.html";
    const url = `${urlAddArticulo}?${queryString}`;
    window.location.href = url;
  });
  $("#ver-info").on("hidden.bs.modal", function () {
    // borro los datos de las tablas porque si no quedan en el dom la proxima vez que abra
    clearTableMov();
    clearTableMermas();
  });

  $("#selectMerma").on("change", function (e) {
    motivo_merma = $("#selectMerma").val();
  });

  $("#btnMerma").on("click", function (e) {
    e.preventDefault();
    const cant = 1;
    const motivo = motivo_merma;
    const proveedor = proveedor_actual;
    const dataSend = { id, motivo, cant, proveedor };

    if (motivo_merma != "Motivo de la merma") {
      //console.log("agrego merma", motivo_merma, "id_articulo", id_actual);
      let body_mermas = document.getElementById("body_mermas");
      let prepend = false;
      if (body_mermas.children) {
        prepend = true;
      }
      let mermaToTableMermas = {
        mov_desc: motivo,
        mov_fecha: luxon.DateTime.now().toISO({ includeOffset: true }),
      };

      agregarItemTablaMermas(mermaToTableMermas, -1, body_mermas, prepend);

      prepend = false;
      let body_mov = document.getElementById("body_mov");
      if (body_mov.children) prepend = true;
      let mermaToTableMov = {
        mov_tipo: "merma",
        mov_cantidad: 1,
        mov_proveedor: proveedor,
        mov_fecha: luxon.DateTime.now().toISO({ includeOffset: true }),
      };
      agregarItemTablaMovimientos(mermaToTableMov, -1, body_mov, prepend);

      // Agrego Merma
      let mermaActual = (Number($("#mdMerma").text()) + 1).toString();
      $("#mdMerma").text(mermaActual);

      $("#selectMerma").val("Motivo de la merma");
      motivo_merma = "Motivo de la merma";
      sendMerma(dataSend);
    }
  });

  const clearTableMov = () => {
    const tableBody = document.querySelector("#table_mov tbody");

    // Loop through rows and remove them
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
  };
  const clearTableMermas = () => {
    const tableBody = document.querySelector("#table_mermas tbody");

    // Loop through rows and remove them
    while (tableBody.firstChild) {
      tableBody.removeChild(tableBody.firstChild);
    }
  };

  const sendMerma = async (data) => {
    axios
      .post(urlMovimientosMerma, data)
      .then(async function (response) {
        let dataResponse = response.data.data;
        //console.log(dataResponse);
        motivo_merma = "Motivo de la merma";
        movimientos = null;
        mermas = null;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  $("#ver-info .mdDel").on("click", async function (e) {
    await deleteArticulofromModal(id);
  });

  let modalArticulo = new bootstrap.Modal(document.getElementById("ver-info"));
  modalArticulo.show();
};

const deleteArticulofromModal = async (idBorrar) => {
  await axios.delete(`${urlBase}/${idBorrar}`);
  redirectToPageFromModal("../index.html");
};

function redirectToPageFromModal(url) {
  window.location.href = url;
}
