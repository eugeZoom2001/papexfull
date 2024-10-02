let operacion = "alta";
let idModeloActual = -1;
let kmActual ;
$(document).ready(function () {
  // Editar
  $("#editVencimientoLic").datepicker();
  $("#editVencimientoGnc").datepicker();
  $("#editVencimientoTecnica").datepicker();
  $("#editVencimientoHidra").datepicker();
  //   Alta
  $("#altaVencimientoLic").datepicker();
  $("#altaVencimientoGnc").datepicker();
  $("#altaVencimientoTecnica").datepicker();
  $("#altaVencimientoHidra").datepicker();
  AbrirSesion(TIEMPO_MAX_SESSION);
  start();
  //init();
}); // on ready

const start = () => {
  if (Logueado()) {
    const usuario = sGetData("nombre");
    const nivel = sGetData("nivel");
    //console.log("nivel usuario" , usuario,nivel);
    if (nivel != 0) {
      $("#idAdmin").css({ visibility: "hidden" });
     
    }

    init();
  } else {
    CerrarSessionYSalir();
  }
};
  
  function init() {

    S_CargarServer(url_cargarMoviles, "POST", {})
      .then((result) => {
        if (result) {
          if (result.result === "ok") {
              result.moviles.forEach((element) => {
             // console.log("Elementio",element);  //ok
              let dataMovil = {
                patente: element.patente.toUpperCase(),
                titular: element.titular,
                marcaNombre: element.marcaNombre.toUpperCase(),
                valor: element.valor,
                km: element.km,
                marca: element.marca,
                licencia: element.licencia,
                vencimientoLic: crearFechaMostrar(element.vencimientoLic),
                vencimientoGnc: crearFechaMostrar(element.vencimientoGnc),
                vencimientoTecnica: crearFechaMostrar(element.vencimientoTecnica),
                vencimientoHidra: crearFechaMostrar(element.vencimientoHidra),
              };
  
             // console.log("data movil",dataMovil);
              const itemNuevo = crearItem(dataMovil);
              agregarItemTabla(itemNuevo);
            
            });
          
          } else {
            alert("algo salio mal");
          
          }
          
        }
  
      })
      .catch((err) => {
        console.log("error",err);
      });
  
  }
     


//  *************** Varios **************
function salir(donde) {
  document.location.href = donde;
}

function agregarItemTabla(itemNuevo) {
  $("#idTablaMovil").append(itemNuevo);
}
function crearItem(itemLista) {
  let tr;
  tr = document.createElement("tr");
  // tr.addEventListener("click", seleccionarItem, false);

  let tdRow = document.createElement("th");
  tdRow.innerText = tablaContarItems();
  tdRow.setAttribute("scope", "row");
  tr.appendChild(tdRow);

  let tdPatente = document.createElement("td");
  //tdPatente.setAttribute('name', "nombre")
  tdPatente.innerText = itemLista.patente.toUpperCase();
  tr.appendChild(tdPatente);


  let tdLicencia = document.createElement("td");
  tdLicencia.innerText = itemLista.licencia;
  tr.appendChild(tdLicencia);

  let tdTitular = document.createElement("td");
  //tdTitular.setAttribute('name', "modelo")
  tdTitular.innerText = itemLista.titular;
  tr.appendChild(tdTitular);
  
  let tdMarcaNombre = document.createElement("td");
  //tdMarca.setAttribute('name', "modelo")
  tdMarcaNombre.innerText = itemLista.marcaNombre;
  tr.appendChild(tdMarcaNombre);

  let tdMarca = document.createElement("td");
  //tdMarca.setAttribute('name', "modelo")
  tdMarca.innerText = itemLista.marca;
  tdMarca.setAttribute("name", "marca");
  tdMarca.setAttribute("class", "d-none");
  tr.appendChild(tdMarca);

  
  let tdKm = document.createElement("td");
  //tdPatente.setAttribute('name', "nombre")
  tdKm.innerText = itemLista.km;
  tdKm.setAttribute("class", "d-none");
  tr.appendChild(tdKm);

  let tdValor = document.createElement("td");
  tdValor.innerText = itemLista.valor;
  tdValor.setAttribute("name", "valor");
  tdValor.setAttribute("class", "d-none");
  tr.appendChild(tdValor);

  let tdVencimientoLic = document.createElement("td");
  tdVencimientoLic.innerText = itemLista.vencimientoLic;
  tdVencimientoLic.setAttribute("class", "d-none");
  tr.appendChild(tdVencimientoLic);

  let tdVencimientoGnc = document.createElement("td");
  tdVencimientoGnc.innerText = itemLista.vencimientoGnc;
  tdVencimientoGnc.setAttribute("class", "d-none");
  tr.appendChild(tdVencimientoGnc);

  

  let tdVencimientoTecnica = document.createElement("td");
  tdVencimientoTecnica.innerText = itemLista.vencimientoTecnica;
  tdVencimientoTecnica.setAttribute("class", "d-none");
  tr.appendChild(tdVencimientoTecnica);
  
  let tdVencimientoHidra = document.createElement("td");
  tdVencimientoHidra.innerText = itemLista.vencimientoHidra;
  tdVencimientoHidra.setAttribute("class", "d-none");
  tr.appendChild(tdVencimientoHidra);
  //Crear Botones
  let tdBotones = document.createElement("td");
  let divBotones = document.createElement("div");
  divBotones.setAttribute("class", "btn-group btn-group-sm");
  divBotones.setAttribute("role", "group");
  divBotones.setAttribute("aria-label", "Basic mixed styles example");

  let buttonBorrar = document.createElement("button");
  buttonBorrar.setAttribute("type", "button");
  buttonBorrar.setAttribute("class", "btn-borrar btn btn-danger");
  buttonBorrar.setAttribute("data-toggle", "modal");
  buttonBorrar.setAttribute("data-target", "#myModal2");
  buttonBorrar.innerText = "Borrar";
  tdBotones.appendChild(divBotones);

  let buttonEditar = document.createElement("button");
  buttonEditar.setAttribute("type", "button");
  buttonEditar.setAttribute("class", "btn-edit btn btn-success");
  buttonEditar.setAttribute("data-toggle", "modal");
  buttonEditar.setAttribute("data-target", "#myModal3");
  buttonEditar.innerText = "Editar";
  tdBotones.appendChild(divBotones);
  divBotones.appendChild(buttonBorrar);
  divBotones.appendChild(buttonEditar);
  tr.appendChild(tdBotones);
  //console.log("tr ",tr);
  return tr;
}

function cargarModelos() {
  S_CargarServer(url_cargarModelos, "POST", {})
    .then((result) => {
      if (result.result === "ok") {
        if (result.modelos.length > 0) {
          cargarModelosSelect(result.modelos);
        } else {
          console.log("no hay modelos");
        }
      }
    })
    .catch((err) => {});
}
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

$("#idBuscar").on("keyup", function () {
  var value = $(this).val().toLowerCase();
  $("#idTablaMovil tr").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
});

function limpiarTareaModalEdit() {
  $("#editTarea").val("");
  $("#idEditContainerTareas > p").each(function (index, element) {
    element.remove();
   
  });
}

function limpiarTareas() {
  $("#idContainerTareas > p").each(function (index, element) {
    element.remove();
    $("#altaTarea").val("");
  });
}

$("#idBotonRefrescar").on("click", function () {
  $("#idBuscar").val("");
  Refrescar("#idBuscar");
});
$("#idBuscar").on("keyup", function () {
  var value = $(this).val().toLowerCase();
  $("#idTablaMovil tr").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
});

function Refrescar(tag) {
  var value = $(tag).val().toLowerCase();
  $("#idTablaMovil tr").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
}

function tablaContarItems() {
  return $("#idTablaMovil tr").length;
}

function validarDatosModalModelo(data) {
  let datosValidos = false;
  datosValidos = data.marca.length > 0;
  return datosValidos;
}




// ************* ALTA MODELO **********************

$("#ModalAltaPrecio").on("click", "#btnModalGuardarAltaPrecio", function () {
  let marca = $("#altaModelo").val();
  let precio = $("#altaValor").val();
  let data = {
    marca: marca,
    precio: precio,
  };
  if (validarDatosModalModelo(data)) {
    //console.log("envio datos ...", data);
    data.operacion = "alta";
    S_CargarServer(url_altaModelo, "POST", data)
      .then((result) => {
        MostrarAlerta(
          "#responseEditAltaModelo",
          "Exito",
          true,
          salir("listaprecios.html")
        );
      })
      .catch((err) => {
        console.log("error");
      });
  } else {
    MostrarAlerta(
      "#responseEditAltaModelo",
      "Error:Complete los Datos!!",
      false
    );
  }
});





// ********* ALTA MOVIL  *************

$("#ModalAlta").on("click", ".btn-guardarAlta", function () {
   let patente = $("#altaPatente").val();
  let licencia = $("#altaLicencia").val();
  let titular = $("#altaTitular").val();
  let marca = $("#inputModelo").val();
  let km = $("#altaKm").val();
  let valor = $("#altaValor").val();
  let tarea = $("#altaTarea").val();
  let vencimientoLic = $("#altaVencimientoLic").val();
  let vencimientoGnc = $("#altaVencimientoGnc").val();
  let vencimientoTecnica = $("#altaVencimientoTecnica").val();
  let vencimientoHidra = $("#altaVencimientoHidra").val();

  let data = {
    patente: patente,
    licencia: licencia,
    titular: titular,
    marca: marca,
    km: km,
    valor: valor,
    tarea: tarea,
    fechaTarea: crearFechaServer(),
    vencimientoLic: convertirFechaServer(vencimientoLic),
    vencimientoGnc: convertirFechaServer(vencimientoGnc),
    vencimientoTecnica: convertirFechaServer(vencimientoTecnica),
    vencimientoHidra: convertirFechaServer(vencimientoHidra),
    operacion: operacion,
  };
  
  
  if (validarDatosModal(data)) {
    
    S_CargarServer(url_altaMovil, "POST", data)
      .then((result) => {
        if (result.result === "ok") {
          data.marcaNombre= $("#inputModelo option:selected").text(); 
           GuardarModalAlta(data);
           //console.log("Exito alta",data);
        } else {
          MostrarAlerta(
            "#responseEditAlta",
            "Error: El Auto ya Existe!!",
            false
          );
        }
       
      })
      .catch((err) => {
        console.log("error", err);
      });
  } else {
    MostrarAlerta("#responseEditAlta", "Error:Complete los Datos!!", false);
  }
  
});

function validarDatosModal(data) {
  let datosValidos = false;
  datosValidos =
    data.patente.length > 0 && data.titular.length > 0 &&
    data.marca.length > 0 && data.marca !="-1";

  return datosValidos;
}

function GuardarModalAlta(data) {
  exito = true;

  if (exito) {
    const itemNuevo = crearItem(data);
    agregarItemTabla(itemNuevo);
    MostrarAlerta(
      "#responseEditAlta",
      "Movil guardado con exito!",
      exito,
      () => {
        $("#ModalAlta").modal("hide");
      }
    );
  } else {
    MostrarAlerta("#responseEditAlta", "Error:Patente Ya Existe!!", exito);
  }
}

$("#btnAltaMovil").on("click", function () {
  // inicializo
  operacion = "alta";
  cargarModelos();
  $("#ModalAlta input").each(function (index, element) {
    $(element).val("");
  });
  limpiarTareas();
});






// ***************** EDITAR MOVIL

$("#idTablaMovil").on("click", ".btn-edit", function () {
  // obtiene la fila actual
  operacion="edit"
  let currentRow = $(this).closest("tr");
  currentEditMovil = currentRow;
  let row = currentRow.children("th").text();
  currentRowEdit = row;
  patenteActual = currentRow.find("td:eq(0)").text().trim();
  let licencia = currentRow.find("td:eq(1)").text();
  let titular = currentRow.find("td:eq(2)").text();
  let marcaNombre = currentRow.find("td:eq(3)").text();
  let marca = currentRow.find("td:eq(4)").text();
  let km = currentRow.find("td:eq(5)").text();
  kmActual=km;
  let valor = currentRow.find("td:eq(6)").text();
  let vencimientoLic = currentRow.find("td:eq(7)").text();
  let vencimientoGnc = currentRow.find("td:eq(8)").text();
  let vencimientoTecnica = currentRow.find("td:eq(9)").text();
  let vencimientoHidra = currentRow.find("td:eq(10)").text();
  
  idModeloActual=parseInt(marca);
  cargarModelos();

  let data = {
    patenteActual: patenteActual,
    licencia: licencia,
    titular: titular,
    marcaNombre: marcaNombre,
    marca: marca,
    km: km,
    valor:valor,
    row: row,
    vencimientoLic: vencimientoLic,
    vencimientoGnc: vencimientoGnc,
    vencimientoTecnica: vencimientoTecnica,
    vencimientoHidra: vencimientoHidra
  };

  
  
  let paramTarea = {
    patente: patenteActual,
  };


  //limpiarTareas();
  limpiarTareaModalEdit();

  S_CargarServer(url_TareasMovil, "POST", paramTarea)
    .then((result) => {
      if (result) {
        if (result.result === "ok") {
          if(result.tareas.length>0){ 
            //console.log("tareas movil",result.tareas);
            cargarTareasMovil(result.tareas);
          }
        } else {
          alert("algo salio mal");
        
        }
      }
    })
    .catch((err) => {
      console.log("error",err);
    });

  cargarModalMovilEdit(data);

});



function cargarTareasMovil(arrTareas) {
  $.each(arrTareas, function (key, value) {
  //  console.log( key + ": " + value.patente,value.tarea,value.fecha);
   agregarTarea(value.tarea, crearFechaMostrar( value.fecha));
   });
}

function cargarModalMovilEdit(data) {
 
  $("#editPatente").val(data.patenteActual);
  $("#editLicencia").val(data.licencia);
  $("#editTitular").val(data.titular);
  $("#editKm").val(data.km);
  $("#editValor").val(data.valor);
  $("#editVencimientoLic").val(data.vencimientoLic.trim());
  $("#editVencimientoGnc").val(data.vencimientoGnc.trim());
  $("#editVencimientoTecnica").val(data.vencimientoTecnica.trim());
  $("#editVencimientoHidra").val(data.vencimientoHidra.trim());

}

function GuardarEditarModal(data) {
//  console.log("GuardarEditarModal",data);
  let vencimientoLic = crearFechaMostrar(data.vencimientoLic);
  let vencimientoGnc = crearFechaMostrar(data.vencimientoGnc);
  let vencimientoTecnica = crearFechaMostrar(data.vencimientoTecnica);
  let vencimientoHidra = crearFechaMostrar(data.vencimientoHidra);
  
  
  if (currentEditMovil) {
    currentEditMovil.find("td:eq(0)").text(data.patente);
    currentEditMovil.find("td:eq(1)").text(data.licencia);
    currentEditMovil.find("td:eq(2)").text(data.titular);
    currentEditMovil.find("td:eq(3)").text(data.marcaNombre);
    currentEditMovil.find("td:eq(4)").text(data.marca);
    currentEditMovil.find("td:eq(5)").text(data.km);
    currentEditMovil.find("td:eq(6)").text(data.valor);
    currentEditMovil.find("td:eq(7)").text(vencimientoLic);
    currentEditMovil.find("td:eq(8)").text(vencimientoGnc);
    currentEditMovil.find("td:eq(9)").text(vencimientoTecnica);
    currentEditMovil.find("td:eq(10)").text(vencimientoHidra);
    let tarea = $("#editTarea").val();
    
    if (tarea.length > 0) {
      agregarTarea(tarea, crearFechaStr());
    }
    
    MostrarAlerta(
        "#responseEdit",
        "Cambios Guardados con Exito!",
        true,
        () => {
          limpiarTareaModalEdit();
          $("#myModal3").modal("hide");
        }
      );
    
  }

}


$("#myModal3").on("click", ".btn-guardarModal", function () {
  let patente = $("#editPatente").val();
  let licencia = $("#editLicencia").val();
  let titular = $("#editTitular").val();
  let marca = $("#selectEditMarca").val();
  let marcaNombre = $("#selectEditMarca option:selected").text(); 
  let km = $("#editKm").val();
  let valor = $("#editValor").val();
  let tarea = $("#editTarea").val();
  let vencimientoLic = $("#editVencimientoLic").val();
  let vencimientoGnc = $("#editVencimientoGnc").val();
  let vencimientoTecnica = $("#editVencimientoTecnica").val();
  let vencimientoHidra = $("#editVencimientoHidra").val();

  let data = {
    patente: patente.toUpperCase(),
    licencia: licencia,
    titular: titular,
    marca: marca.toUpperCase(),
    marcaNombre:marcaNombre,
    patente: patente.toUpperCase(),
    patenteActual: patenteActual.toUpperCase(),
    km: km,
    cambioKm:"no",
    valor:valor,
    tarea: tarea,
    fechaTarea: crearFechaServer(),
    vencimientoLic: convertirFechaServer(vencimientoLic),
    vencimientoGnc: convertirFechaServer(vencimientoGnc),
    vencimientoTecnica: convertirFechaServer(vencimientoTecnica),
    vencimientoHidra: convertirFechaServer(vencimientoHidra)
  };
   
  if (km!=kmActual){
    data.cambioKm="si"
  }else{

  }
 
  if (validarDatosModal(data)) {
    
   console.log("update envio datos",data); 
   

    S_CargarServer(url_UpdateMovil, "POST", data)
    .then((result) => {
     GuardarEditarModal(data);
    //  console.log("update exito");      
    })
    .catch((err) => {
      console.log("error server");
    });
   
  } else {
    MostrarAlerta("#responseEdit", "Error : Complete los Campos!!", false);
  }

});


function agregarTarea(tarea, fecha) {
  let tareaNueva;
  tareaNueva = document.createElement("p");
  tareaNueva.innerText = fecha + " " + tarea;
  document.getElementById("idEditContainerTareas").appendChild(tareaNueva);
}

// *************** BORRAR MOVIL *************************************

$("#idTablaMovil").on("click", ".btn-borrar", function () {
  let currentRow = $(this).closest("tr");
  patenteBorrar = currentRow.find("td:eq(0)").text().trim();
  tagBorrar = $(this).closest("tr");
});

$("#myModal2").on("click", ".btn-borrarModal", function () {
  const data = {
      patente: patenteBorrar,
  };

  console.log("borro movil",data);
  S_CargarServer(url_borrarMovil, "POST", data)
  .then((result) => {
  borrarMovil();
  //  console.log("update exito");      
  })
  .catch((err) => {
    console.log("error server");
  });
});

function borrarMovil() {
  if (tagBorrar) {
    tagBorrar.remove();
  }
  tagBorrar = null;
}
