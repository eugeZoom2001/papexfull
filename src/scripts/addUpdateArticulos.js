const inputBarras = $("#inputBarras");
const inputSku = $("#inputSku");
const selectSku = $("#skuOptions");
let resultSku = null;
//let articulos = null;
let loadButton = $("#loadButton");
let proveedores = null;
let esAlta = false;
let ar_idActual;
let btnGuardar = $("#sumbmitform");
let prov_actual = null;
let stock_actual = 0;
let sku_actual = null;
let formData = null;
let isEdit = false;
const files = document.getElementById("file");

$(document).ready(async function () {
  // me fijo si viene de edit
  checkQuery();
  if (!isEdit) {
    $("#inputSku").click(function (e) {
      $("#inputSku").val("");
    });

    $("#descripcion").click(function (e) {
      $("#descripcion").val("");
    });

    $("#cantidad").click(function (e) {
      $("#cantidad").val("");
    });

    $("#inputBarras").change(async function (e) {
      if ($("#inputBarras").val()) {
        $("#inputSku").focus();
        resultSku = await getSkus();
        if (resultSku) {
          const { result, data } = resultSku;
          getDataSkus(data);
        } else console.log("error");
      }
    });

    $("#inputSku").on("change", async function (e) {
      var opt = $('option[value="' + $(this).val() + '"]');
      sku_actual = e.target.value;
      console.log(opt.length ? opt.attr("id") : null);
      let id = opt.length ? opt.attr("id") : null;
      let prov = opt.length ? opt.attr("prov") : null;
      let stock = opt.length ? opt.attr("stock") : "0";
      let desc = opt.length ? opt.attr("desc") : null;
      if (!id) {
        esAlta = true;
      } else {
        esAlta = false;
        ar_idActual = Number(id);
        prov_actual = Number(prov);
        stock_actual = Number(stock);
        $("#stockActual").val(stock_actual);
        $("#descripcion").val(desc);
      }
      $("#descripcion").focus();
      await getProveedores();
    });
  }

  $("#cancelButton").click(function (e) {
    document.location.href = "../index.html";
  });

  $("#formArticulo").submit(function (e) {
    e.preventDefault();
    formData = new FormData();
    formData.append("sku", sku_actual);
    formData.append("barras", $("#inputBarras").val().trim());
    formData.append("desc", $("#descripcion").val().trim());
    formData.append("proveedor", $("#selectProv").val());
    formData.append("stock", $("#cantidad").val());
    if (files)
      for (let i = 0; i < files.files.length; i++) {
        formData.append("file", files.files[i]);
      }

    if (esAlta) {
      postArticulo();
    } else {
      ar_idActual = ar_idActual.toString();
      putArticulo();
    }
  });
});

const getProveedores = async () => {
  const url = `${urlProveedores}`;
  const res = await axios.get(url);
  if (res.status === 200) {
    //console.log(res.data.data);
    setProveedoresSelect(res.data.data);
  } else {
    console.log("no hay proveedores");
  }
};

const getDataSkus = (skus) => {
  console.log("skus", skus);
  if (skus.length === 0) {
    //esAlta = true;
    console.log("no hay articulos con esa barra");
  } else {
    //
    //ar_idActual = skus[0].ar_id;
    prov_actual = skus[0].ar_proveedor;
    for (const sku of skus) {
      let option = document.createElement("option");

      option.setAttribute("id", sku.ar_id);
      option.setAttribute("value", sku.ar_sku);
      option.setAttribute("prov", sku.ar_proveedor);
      option.setAttribute("stock", sku.ar_stock);
      option.setAttribute("desc", sku.ar_desc);
      $(selectSku).append(option);
    }
  }
};
const setProveedoresSelect = (provs) => {
  console.log("provs", provs);
  console.log(
    "id",
    ar_idActual,
    "prov_actual ",
    prov_actual,
    "type",
    typeof prov_actual
  );
  for (const prov of provs) {
    let selected = false;
    if (prov.prov_id === prov_actual) selected = true;
    addProvSelect(prov, selected);
  }
};

const addProvSelect = (prov, selected) => {
  //console.log(prov_actual);
  const { prov_id, prov_nombre } = prov;
  let select = document.getElementById("selectProv");
  let opcion = document.createElement("option");
  opcion.setAttribute("value", prov_id);
  if (selected) opcion.setAttribute("selected", true);
  opcion.innerText = prov_nombre;
  select.appendChild(opcion);
};

// hay mas de un sku

const getSkus = async () => {
  //const url = `${urlBarras}/${inputBarras.val()}`;
  const url = `${urlBarras}/${$("#inputBarras").val()}`;
  const res = await axios.get(url);
  if (res.status === 200) return res.data;
  else resultSku = null;
};

async function postArticulo() {
  openSpinner();
  axios
    .post(urlBase, formData)
    .then(function (response) {
      console.log(response.data);

      document.location.href = "form-addon.html";
    })
    .catch(function (error) {
      console.log(error);
    });
  closeSpinner();
}

async function putArticulo() {
  openSpinner();
  try {
    await axios({
      method: "PUT",
      url: urlBase + "/" + `${ar_idActual}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    document.location.href = "form-addon.html";
  } catch (error) {
    console.log(error);
  }
  closeSpinner();
}

const checkQuery = async () => {
  const queryString = window.location.search;
  // console.log(queryString);
  const urlParams = new URLSearchParams(queryString);

  if (urlParams.has("id")) {
    isEdit = true;
    const id = urlParams.get("id");
    console.log("id from Add-Form", id);
    await getArticuloFromId(id);
  } else {
    console.log("viene de Alta");
  }
};

const getArticuloFromId = async (idArticulo) => {
  axios
    .get(`${urlBase}/${idArticulo}`)
    .then(async function (response) {
      // manejar respuesta exitosa
      if (response.data.result === "ok") {
        const articulo = response.data.data;
        console.log(articulo);
        const { barras, descripcion, id, id_proveedor, stock, sku } = articulo;

        ar_idActual = id;
        prov_actual = id_proveedor;
        sku_actual = sku;
        $("#descripcion").val(descripcion);
        $("#inputSku").val(sku);
        $("#inputBarras").val(barras);
        $("#stockActual").val(stock);
        await getProveedores();
      }
    })
    .catch(function (error) {
      console.log("error"); // manejar error
      console.log(error);
    });
};

const openSpinner = () => {
  $("#overlay").show(); // Mostrar el overlay
  $("#spinner").show(); // Mostrar el spinner
};

const closeSpinner = () => {
  $("#overlay").hide(); // Mostrar el overlay
  $("#spinner").hide(); // Mostrar el spinner
};
