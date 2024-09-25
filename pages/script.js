// Script.js 
// create a new QRCode instance 
let qrcode = new QRCode(
    document.querySelector(".qrcode")
);

// Initial QR code generation 
// with a default message 
qrcode.makeCode("Why did you scan me?");

// Function to generate QR 
// code based on user input 
function generateQr() {
    if (
        document.querySelector("input2")
            .value === "" ||
        document.querySelector("input2")
            .value === " ") {
        alert(
            "Input Field Can not be blank!"
        );
    }
    else {
        qrcode.makeCode(
            document.querySelector(
                "input"
            ).value);
        document.querySelector("input2").value = ""
    }
}
function printQr() {
    const printWindow = window.open('', '', 'height=400,width=600');
    printWindow.document.write('<html><head><title>Imprimir QR</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(document.querySelector(".qrcode").outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}