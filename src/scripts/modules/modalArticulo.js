let id_actual = null;
let motivo_merma = "Motivo de la merma";

export const makeModal = async (id_art) => {
  getArticuloById(id_art);
};

const getArticuloById = async (idArticulo) => {
  axios
    .get(`${urlBase}/${idArticulo}`)
    .then(async function (response) {
      // manejar respuesta exitosa
      if (response.data.result === "ok") {
        const articulo = response.data.data;
        setModalInfo(articulo);
      }
    })
    .catch(function (error) {
      console.log("error"); // manejar error
      console.log(error);
    });
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

  $("#selectMerma").on("change", function (e) {
    motivo_merma = $("#selectMerma").val();
  });

  $("#btnMerma").on("click", async function (e) {
    if (motivo_merma != "Motivo de la merma") {
      console.log("agrego merma");
      showSuccessToast();
    }
  });

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
