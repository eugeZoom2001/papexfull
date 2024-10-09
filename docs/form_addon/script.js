const url = "http://localhost:3000/api/articulos";
const url_consulta = "http://localhost:3000/api/articulos/code";
let id_articulo = null;

let formData = null;
let articuloExists = false;
const barras = document.getElementById("barras");
const sku = document.getElementById("sku");
const desc = document.getElementById("desc");
const proveedor = document.getElementById("proveedor");
const stock = document.getElementById("stock");
const files = document.getElementById("file");
const form = document.getElementById("form");
window.onload = (event) => {
  barras.focus();

  sku.addEventListener("change", (e) => {
    if ((barras.value.length = 0)) barras.focus();
  });

  proveedor.addEventListener("focus", () => {
    //console.log("focus en proveedor");
    if (sku.value.length > 0 && barras.value.length > 0)
      enviarAServer(barras.value, sku.value);
    else barras.focus();
  });
};
const enviarAServer = async (barras, sku) => {
  const data = { barras, sku };
  const res = await axios.get(url_consulta, { params: data });
  const response = res.data;
  //console.log(response);
  if (response.result === "ok") {
    //console.log("articulo existe");
    if (response.data.data.length > 0) {
      articuloExists = true;
      console.log("existe articulo ", articuloExists);
      const { ar_id, ar_stock, prov_id, prov_nombre, ar_desc } =
        response.data.data[0];
      id_articulo = ar_id;
      console.log("id", ar_id);
    } else {
      articuloExists = false;
    }
    console.log(articuloExists);
  }
};

// script.js

form.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  formData = new FormData();
  formData.append("sku", sku.value);
  formData.append("barras", barras.value);
  formData.append("desc", desc.value);
  formData.append("proveedor", proveedor.value);
  formData.append("stock", stock.value);
  if (files)
    for (let i = 0; i < files.files.length; i++) {
      formData.append("file", files.files[i]);
    }

  if (articuloExists) putArticulo();
  else postArticulo();
}

async function postArticulo() {
  axios
    .post(url, formData)
    .then(function (response) {
      console.log(response.data);
      document.location.href = "index.html";
    })
    .catch(function (error) {
      console.log(error);
    });
}

async function putArticulo() {
  try {
    await axios({
      method: "PUT",
      url: url + "/" + `${id_articulo}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    document.location.href = "index.html";
  } catch (error) {
    console.log(error);
  }
}
