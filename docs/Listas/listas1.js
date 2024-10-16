let lista = document.getElementById("li");
let btn = document.querySelector("button");

$("button").on("click", function (e) {
  deleteList();
});

$("button").on("keyp", function (e) {
  deleteList();
});

$("input").keypress(function (e) {
  let key = e.target.value;
  console.log(key);
  if (e.which == 13) {
    e.preventDefault();
    console.log("envio mensaje", key);
    const data = {
      msg: key,
      fechaHora: luxon.DateTime.now().toFormat("dd/MM/yyyy HH:mm"),
    };
    agregarItem(data);
    $("input").val("");
  }
});

const items = [
  {
    fechaHora: "08/10/2024 20:06",
    msg: "que garcha",
  },
  {
    fechaHora: "08/10/2024 19:25",
    msg: "que bueno",
  },
];

const agregarItemsLista = (items) => {
  for (const item of items) agregarItem(item);
};
const agregarItem = ({ fechaHora, msg }) => {
  let newElem = document.createElement("li");
  let liStrong = document.createElement("span");
  liStrong.setAttribute("class", "clsFecha");
  liStrong.innerText = fechaHora;
  newElem.appendChild(liStrong);
  lisSpan = document.createElement("strong");
  lisSpan.setAttribute("class", "clsMsg");
  lisSpan.innerText = msg;
  newElem.appendChild(lisSpan);

  if (lista.children) {
    lista.prepend(newElem);
  } else {
    lista.appendd(newElem);
  }
};

const deleteList = () => {
  console.log("borro Lista");
  $("ul li").empty();
};

agregarItemsLista(items);
