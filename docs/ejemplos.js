function cargarModelosSelect(modelos) {
  //console.log("cargo modelos",modelos,"tipo",typeof(modelos));
  let esAlta = operacion === "alta";
  let idSelect;
  if (esAlta) {
    idSelect = "inputModelo";
    idModeloActual = -1;
    agregarItemSelect(idSelect, { id: -1, marca: " -- Seleccionar ---" }, true);
  } else {
    idSelect = "selectEditMarca";
  }
  modelos.forEach((element) => {
    itemNuevo = {
      id: parseInt(element.id, 10),
      marca: element.marca,
    };
    agregarItemSelect(idSelect, itemNuevo);
    // console.log("modelo",itemNuevo);//ok
  });
}
function agregarItemSelect(idSelect, item) {
  //console.log("item modelo:", item);
  let select = document.getElementById(idSelect);
  let opcion = document.createElement("option");
  opcion.setAttribute("value", item.id);
  if (item.id === idModeloActual) {
    opcion.setAttribute("selected", true);
  }

  opcion.innerText = item.marca;
  select.appendChild(opcion);
}
