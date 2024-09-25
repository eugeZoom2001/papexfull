document.getElementById("btn").addEventListener("click", () => {
    let text = document.getElementById("text").value;
    JsBarcode("#barcode", text);
});
