const inputBarras = $("#inputBarras")
const inputSku = $("#inputSku")
let resultSku = null
let id_articuloSelect = null


$(document).ready(function () {
    // console.log("urlBarras", urlBarras);
    // console.log("urlBase  ", urlBase);

    $('#inputBarras').focus()
    $('#loadButton').click(async function () {
        if (inputBarras.val()) {
            resultSku = await getSkus()
            if (resultSku) {
                console.log(resultSku);
            } else {
                console.log("error"); //no hay resultados
            }
        }
    })
})

const openSpinner = () => {
    $('#overlay').show(); // Mostrar el overlay
    $('#spinner').show(); // Mostrar el spinner   
}

const closeSpinner = () => {
    $('#overlay').hide(); // Mostrar el overlay
    $('#spinner').hide(); // Mostrar el spinner   
}

const getSkus = async () => {
    const url = `${urlBarras}${inputBarras.val()}`
    const res = await axios.get(url);
    if (res.data.result === "ok") resultSku = res.data.data
    else resultSku = null


}