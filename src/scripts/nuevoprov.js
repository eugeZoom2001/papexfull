let isEdit = false;
prov_actual = null;

$(document).ready(function () {
  init();
});

const init = () => {
  checkQuery();

  if (!isEdit) {
    $("input").click(function (e) {
      e.target.value = "";
    });
  }
  $(".cancelBtn").click(() => {
    console.log("cancel");
    window.location.href = "../pages/proveedores.html";
  });

  $("#formProv").submit(function (e) {
    e.preventDefault();
    getForm();
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
  redirectToPage("proveedores.html");
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
    })
    .catch(function (response) {
      console.log(response);
    });
};

const putData = (formData) => {
  axios({
    method: "put",
    url: `${urlProveedores}/${prov_actual}`,
    data: formData,
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      console.log(response);
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
    isEdit = true;
    await getProveedorById(id);
  } else {
    console.log("viene de Alta");
  }
};

const getProveedorById = async (idprov) => {
  axios
    .get(`${urlProveedores}/${idprov}`)
    .then(async function (response) {
      if (response.data.result === "ok") {
        const proveedor = response.data.data;
        const { nombre, direccion, telefono, referente, email } = proveedor;

        $("#idNombre").val(nombre);
        $("#idDireccion").val(direccion);
        $("#idTelefono").val(telefono);
        $("#idReferente").val(referente);
        $("#idEmail").val(email);
      }
    })
    .catch(function (error) {
      console.log("error"); // manejar error
      console.log(error);
    });
};

function redirectToPage(url) {
  window.location.href = url;
}
