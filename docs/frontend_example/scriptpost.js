// script.js
const url = "http://localhost:3000/api/articulos";
const form = document.getElementById("form");
const sku = document.getElementById("sku");
const desc = document.getElementById("desc");
const proveedor = document.getElementById("proveedor");
const stock = document.getElementById("stock");
const files = document.getElementById("file");
let formData
form.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  const barras = document.getElementById("barras");

  formData = new FormData();
  formData.append("sku", sku.value);
  formData.append("barras", barras.value);
  formData.append("desc", desc.value);
  formData.append("proveedor", proveedor.value);
  formData.append("stock", stock.value);

  // for (let i = 0; i < files.files.length; i++) {
  //   formData.append("file", files.files[i]);
  // }
  formData.append("file", files.files[0]);
  fetch(url, {
    method: 'POST',
    body: formData,

  })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}