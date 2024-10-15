const agregarItemTablaMovimientos = (mov, idx = -1, body, prepend = false) => {
  let prefix = "-";
  let motivo = "Merma de Stock";
  let cls = "table-danger";
  if (mov.mov_tipo === "alta") {
    prefix = "+";
    motivo = "Ingreso en stock";
    cls = "table-success";
  } else if (mov.mov_tipo === "venta") {
    motivo = "Venta";
    cls = "table-primary";
  }

  let trMov = document.createElement("tr");
  trMov.setAttribute("class", cls);

  let thCant = document.createElement("th");
  thCant.setAttribute("class", "text-body");

  thCant.innerHTML = prefix + mov.mov_cantidad.toString();
  trMov.appendChild(thCant);

  let tdMotivo = document.createElement("td");
  tdMotivo.setAttribute("class", "text-body");
  let tdStrong = document.createElement("strong");
  tdStrong.innerText = motivo;
  tdMotivo.appendChild(tdStrong);
  trMov.appendChild(tdMotivo);

  let tdProv = document.createElement("td");
  tdProv.setAttribute("class", "text-body");
  let tdStrongProv = document.createElement("strong");
  tdStrongProv.innerText = mov.mov_proveedor;
  tdProv.appendChild(tdStrongProv);
  trMov.appendChild(tdProv);

  let tdFecha = document.createElement("td");
  tdFecha.setAttribute("class", "text-body");
  tdFecha.innerText = luxon.DateTime.fromISO(mov.mov_fecha, {
    setZone: true,
  }).toFormat("dd/MM/yyyy");

  trMov.appendChild(tdFecha);

  if (prepend) body.prepend(trMov);
  else body.append(trMov);
};
