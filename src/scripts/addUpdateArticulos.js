const inputBarras = $("#inputBarras")
const inputSku = $("#inputSku")


$(document).ready(function () {
    // console.log("urlBarras", urlBarras);
    // console.log("urlBase  ", urlBase);
    $('#inputBarras').focus()
    $('#loadButton').click(function () {
        $('#overlay').show(); // Mostrar el overlay
        $('#spinner').show(); // Mostrar el spinner

        // Simular un proceso de carga
        // setTimeout(function () {
        //     $('#overlay').hide(); // Ocultar el overlay
        //     $('#spinner').hide(); // Ocultar el spinner
        // }, 2000); // Cambia 2000 por el tiempo que desees

    })
})