$(document).ready(function () {
  $("#formProv").submit(function (e) {
    e.preventDefault();
    getForm();
  });
  $("input").click(function (e) {
    e.target.value = "";
  });
});

const getForm = async () => {
  let formData = new FormData();
  formData.append("nombre", $("#idNombre").val());
  formData.append("referente", $("#idReferente").val());
  formData.append("telefono", $("#idTelefono").val());
  formData.append("direccion", $("#idDireccion").val());
  formData.append("email", $("#idEmail").val());
  sendData(formData);
};
const sendData = async (formData) => {
  axios({
    method: "post",
    url: urlProveedores,
    data: formData,
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      console.log(response);
      $("input").val('');
    })
    .catch(function (response) {
      console.log(response);
    });
};
