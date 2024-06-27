const URL = "https://api.yumserver.com/16963/products";
var lista = document.querySelector(".listaProductos");

cargarProductoLista();

/*=================================================================*/
/* BOTON HEADER RESPOSIVE */
function abrirMenu() {
  var menu = document.getElementById("menuQuery");

  if (menu) {
    menu.classList.toggle("menuMobile-Visible");
    menu.classList.toggle("menuMobile-Invisible");
  }
}

function abrirProductos() {
  var menuProds = document.getElementById("btnProductos");
  if (menuProds) {
    menuProds.classList.toggle("menuProductos-Visible");
    menuProds.classList.toggle("menuProductos-Invisible");
  }
}
/*=================================================================*/
/* CARGAR PRODUCTOS EN TABLA*/
function cargarProductoLista() {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      lista.innerHTML = '';
      for (let i = 0; i < data.length; i++) {
        let fila = `
            <tr>
                <td data-label="Id: ">${data[i].idcod}</td>
                <td data-label="Titulo: ">${data[i].titulo}</td>
                <td data-label="Precio ARS: ">${data[i].precioPeso}</td>
                <td data-label="Precio USD: ">${data[i].precioDolar}</td>
                <td data-label="Fecha: ">12/58/22</td>
                <td data-label="Acciones: ">
                    <button class="btnModificar" id="${data[i].idcod}" onclick="buscar(id)">Modificar</button>
                    <button class="btnEliminar" id="${data[i].idcod}" onclick="borrarProducto(id)">Eliminar</button>
                </td>
            </tr>
            `;
        lista.insertAdjacentHTML("beforeend", fila);
      }
    });
}

/*=================================================================*/
/* CREAR PRODUCTO*/
function crearProducto() {
  let producto = {
    titulo: document.getElementById("titulo").value,
    precioPeso: document.getElementById("precioARS").value,
    precioDolar: document.getElementById("precioUSD").value,
    fecha: document.getElementById("fecha").value,
  };

  fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto),
  })
    .then((response) => response.text())
    .then((data) => {
      if (data === "OK") {
        alert("Producto creado con éxito");
        cargarProductoLista();
        document.getElementById("titulo").value = "";
        document.getElementById("precioARS").value = "";
        document.getElementById("precioUSD").value = "";
        document.getElementById("fecha").value = "";
      } else {
        alert("Error al crear el producto");
      }
    })
    .catch((error) => console.error("Error: ", error));
}
/*=================================================================*/

/* BORRAR PRODUCTO*/
function borrarProducto(idBorrar) {
  if (!idBorrar) {
    alert("Por favor, ingrese un ID de producto válido");
    return;
  }

  if (confirm("¿Estás seguro que quieres eliminar el producto?")) {
    fetch(URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idcod: idBorrar,
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        if (data === "OK") {
          alert("Producto borrado con éxito");
          cargarProductoLista();
        } else {
          alert("Error al eliminar el producto");
        }
      })
      .catch((error) => console.error("Error: ", error));
  }
}
/*=================================================================*/
/* MODIFICAR PRODUCTO */
function buscar(idMod) {
  btnModVisible();
  fetch(URL)
    .then((response) => response.json())
    .then((producto) => {
      var productoEncontrado = false;
      for (let i = 0; i < producto.length; i++) {
        if (producto[i].idcod === idMod) {
          document.getElementById("idMod").value = idMod;
          document.getElementById("tituloMod").value = producto[i].titulo;
          document.getElementById("precioArsMod").value =
            producto[i].precioPeso;
          document.getElementById("precioUsdMod").value =
            producto[i].precioDolar;
          document.getElementById("fechaMod").value = producto[i].fecha;

          productoEncontrado = true;
        }
      }
      if (!productoEncontrado) {
        alert("Producto no encontrado");
      }
    })
    .catch((error) => console.error("Error: ", error));
}
function modificarProducto() {
  let productoMod = {
    idcod: document.getElementById("idMod").value,
    titulo: document.getElementById("tituloMod").value,
    precioPeso: document.getElementById("precioArsMod").value,
    precioDolar: document.getElementById("precioUsdMod").value,
    fecha: document.getElementById("fechaMod").value,
  };

  fetch(URL, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productoMod),
  })
    .then((response) => response.text())
    .then((data) => {
      if (data === "OK") {
        alert("Producto modificado con éxito");
        cargarProductoLista();
        document.getElementById("idMod").value = "";
        document.getElementById("tituloMod").value = "";
        document.getElementById("precioArsMod").value = "";
        document.getElementById("precioUsdMod").value = "";
        document.getElementById("fechaMod").value = "";
      } else {
        alert("Error al modificar el producto");
      }
    })
    .catch((error) => console.error("Error: ", error));
}
/*=================================================================*/
/*VISIBILIDAD DE LOS CARTELES*/
document.querySelectorAll(".btnAgregar").forEach((btn) => {
  btn.addEventListener("click", function () {
    document.querySelector(".modificar").style.display = "none";
    var cartelAgregar = document.querySelector(".crear");

    if (cartelAgregar.style.display == "flex") {
      cartelAgregar.style.display = "none";
    } else {
      cartelAgregar.style.display = "flex";
    }
  });
});

function btnModVisible() {
  document.querySelector(".crear").style.display = "none";
  var cartelModificar = document.querySelector(".modificar");

  if (cartelModificar.style.display == "flex") {
    cartelModificar.style.display = "none";
  } else {
    cartelModificar.style.display = "flex";
  }
}

/*=================================================================*/
