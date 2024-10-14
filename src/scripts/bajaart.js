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
let respuestaServer = null;

$(async function () {
  // me fijo si viene de edit

  $("#inputBarras").trigger("focus");
  if (!isEdit) {
    $("#inputSku").on("click", function (e) {
      $("#inputSku").val("");
    });

    $("#descripcion").attr("readonly", true);

    $("#cantidad").on("click", function (e) {
      $("#cantidad").val("");
    });

    $("#inputBarras").on("change", async function (e) {
      if ($("#inputBarras").val()) {
        $("#inputSku").trigger("focus");
        resultSku = await getSkus();
        if (resultSku) {
          const { result, data } = resultSku;
          await getDataSkus(data);
          await getCuentas();
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

      esAlta = false;
      ar_idActual = Number(id);
      prov_actual = Number(prov);
      stock_actual = Number(stock);
      $("#stockActual").val(stock_actual);
      $("#descripcion").val(desc);
      $("#descripcion").trigger();
    });
  }

  $("#cancelButton").on("click", function (e) {
    document.location.href = "../index.html";
  });

  $("#formArticulo").on("submit", async function (e) {
    e.preventDefault();
    data = {};
    data.cantidad = $("#cantidad").val();
    data.id_art = ar_idActual;
    data.cta = $("#selectCta").val();
    data.prov = prov_actual;

    if (checkData(data)) {
      console.log("envio datos  ", data);
      await postArticuloVenta(data);
    } else {
      alert("complete los campos");
    }
  });
});

const checkData = (data) => {
  if (
    data.cantidad &&
    data.cantidad != "0" &&
    data.cta != "Selecionar una Cuenta"
  )
    return true;
  return false;
};

const getCuentas = async () => {
  const url = `${urlCuentas}`;
  const res = await axios.get(url);
  setCuentasSelect(res.data.data);
};

const getDataSkus = (skus) => {
  console.log("skus", skus);
  if (skus.length === 0) {
    //esAlta = true;
    document.location.href = "../404.html";
  } else {
    //

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
const setCuentasSelect = (cuentas) => {
  for (const cta of cuentas) {
    let selected = false;
    addCtaSelect(cta, selected);
  }
};

const addCtaSelect = (cta, selected) => {
  //console.log(prov_actual);
  const { cta_nro } = cta;
  let select = document.getElementById("selectCta");
  let opcion = document.createElement("option");
  opcion.innerText = cta_nro;
  select.appendChild(opcion);
};

const getSkus = async () => {
  //const url = `${urlBarras}/${inputBarras.val()}`;
  const url = `${urlBarras}/${$("#inputBarras").val()}`;
  const res = await axios.get(url);
  if (res.status === 200) return res.data;
  else resultSku = null;
};

async function postArticuloVenta(data) {
  openSpinner();
  axios
    .post(urlMovimientoVenta, data)
    .then(async function (response) {
      //closeSpinner();
      // return response.data;
      let dataResponse = response.data.data;
      console.log(dataResponse);
      window.location.href = "../pages/bajaart.html";
    })
    .catch(function (error) {
      console.log(error);
    });
  closeSpinner();
}

const openSpinner = () => {
  $("#overlay").show(); // Mostrar el overlay
  $("#spinner").show(); // Mostrar el spinner
};

const closeSpinner = () => {
  $("#overlay").hide(); // Mostrar el overlay
  $("#spinner").hide(); // Mostrar el spinner
};
