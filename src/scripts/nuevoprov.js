let isEdit = false;
prov_actual = null;

$(document).ready(function () {
  init();
});

const init = () => {
  checkQuery();

  $("#formProv").submit(function (e) {
    e.preventDefault();
    getForm();
  });
  if (!isEdit) {
    $("input").click(function (e) {
      e.target.value = "";
    });
  }
  $(".cancelBtn").click(() => {
    console.log("cancel");
    window.location.href = "../pages/proveedores.html";
  });
};

const getForm = async () => {
  let formData = new FormData();
  formData.append("nombre", $("#idNombre").val());
  formData.append("referente", $("#idReferente").val());
  formData.append("telefono", $("#idTelefono").val());
  formData.append("direccion", $("#idDireccion").val());
  formData.append("email", $("#idEmail").val());
  sendData(formData);
};

const sendData = (formData) => {
  if (!isEdit) postData(formData);
  else putData(formData);
};

const postData = async (formData) => {
  axios({
    method: "post",
    url: urlProveedores,
    data: formData,
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      console.log(response);
      $("input").val("");
    })
    .catch(function (response) {
      console.log(response);
    });
};

const putData = () => {
  axios({
    method: "put",
    url: `${urlProveedores}/${prov_actual}`,
    data: formData,
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      console.log(response);
      $("input").val("");
    })
    .catch(function (response) {
      console.log(response);
    });
};

const checkQuery = async () => {
  const queryString = window.location.search;
  // console.log(queryString);
  const urlParams = new URLSearchParams(queryString);

  if (urlParams.has("id")) {
    isEdit = true;
    const id = urlParams.get("id");
    prov_actual = id;
    console.log("id from nuevo prov", id);
  } else {
    console.log("viene de Alta");
  }
};
