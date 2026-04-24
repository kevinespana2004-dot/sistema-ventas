document.addEventListener("DOMContentLoaded", function () {

let productos = []; // 🔥 ahora se reasigna por usuario
let factura = [];
let total = 0;

let usuarios = [
  { user: "admin", pass: "123", negocio: "Mi Negocio", productos: [] }
];

let usuarioActual = null;

// LOGIN
window.entrar = function() {
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  let encontrado = usuarios.find(x => x.user === u && x.pass === p);

  if (encontrado) {
    usuarioActual = encontrado;

    // 🔥 CLAVE: cada usuario tiene su inventario
    productos = usuarioActual.productos;

    document.getElementById("login").style.display = "none";
    document.getElementById("panel").style.display = "block";

    document.getElementById("tituloNegocio").innerText = encontrado.negocio;

    document.getElementById("listaProductos").innerHTML = "";
    productos.forEach(p => {
      let li = document.createElement("li");
      li.textContent = p.nombre + " - $" + p.precio + " | Stock: " + p.stock;
      document.getElementById("listaProductos").appendChild(li);
    });

    actualizarSelect();
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

// SALIR
window.salir = function() {
  document.getElementById("panel").style.display = "none";
  document.getElementById("login").style.display = "block";
}

// REGISTRO
window.mostrarRegistro = function() {
  let reg = document.getElementById("registro");
  reg.style.display = reg.style.display === "none" ? "block" : "none";
}

window.registrar = function() {
  let u = document.getElementById("nuevoUser").value;
  let p = document.getElementById("nuevoPass").value;
  let n = document.getElementById("nombreNegocio").value;

  if (!u || !p || !n) {
    alert("Complete todos los datos");
    return;
  }

  usuarios.push({ user: u, pass: p, negocio: n, productos: [] });

  alert("Usuario creado");

  document.getElementById("nuevoUser").value = "";
  document.getElementById("nuevoPass").value = "";
  document.getElementById("nombreNegocio").value = "";
}

// NAVEGACIÓN
window.mostrar = function(seccion) {
  document.querySelectorAll(".seccion").forEach(s => s.style.display = "none");
  document.getElementById(seccion).style.display = "block";
}

// INVENTARIO
window.agregarProducto = function() {
  let nombre = document.getElementById("nombre").value;
  let precio = parseFloat(document.getElementById("precio").value);
  let stock = parseInt(document.getElementById("stock").value);

  if (!nombre || !precio || !stock) return;

  productos.push({ nombre, precio, stock });

  let li = document.createElement("li");
  li.textContent = nombre + " - $" + precio + " | Stock: " + stock;

  document.getElementById("listaProductos").appendChild(li);

  actualizarSelect();
}

// SELECT
function actualizarSelect() {
  let select = document.getElementById("productoSelect");
  select.innerHTML = "";

  productos.forEach((p, i) => {
    let option = document.createElement("option");
    option.value = i;
    option.text = p.nombre;
    select.appendChild(option);
  });
}

// FACTURA
window.agregarFactura = function() {
  let i = document.getElementById("productoSelect").value;
  let cantidad = parseInt(document.getElementById("cantidadInput").value);

  if (i === "" || !cantidad) return;

  let prod = productos[i];

  if (cantidad > prod.stock) {
    alert("No hay suficiente stock");
    return;
  }

  prod.stock -= cantidad;

  let subtotal = prod.precio * cantidad;

  factura.push({ ...prod, cantidad, subtotal });
  total += subtotal;

  let li = document.createElement("li");
  li.textContent = prod.nombre + " x" + cantidad + " = $" + subtotal;

  document.getElementById("facturaLista").appendChild(li);
  document.getElementById("total").textContent = total;
}

// NUEVA FACTURA
window.nuevaFactura = function() {
  factura = [];
  total = 0;

  document.getElementById("facturaLista").innerHTML = "";
  document.getElementById("total").textContent = "0";
}

// BUSCAR
window.buscarProducto = function() {
  let texto = document.getElementById("busqueda").value.toLowerCase();
  let lista = document.getElementById("resultadoBusqueda");

  lista.innerHTML = "";

  productos.forEach(p => {
    if (p.nombre.toLowerCase().includes(texto)) {
      let li = document.createElement("li");
      li.textContent = p.nombre + " | Stock: " + p.stock;
      lista.appendChild(li);
    }
  });
}

// LIMPIAR
window.limpiarBusqueda = function() {
  document.getElementById("busqueda").value = "";
  document.getElementById("resultadoBusqueda").innerHTML = "";
}

// EXPORTAR
window.exportar = function() {

  let nombre = document.getElementById("clienteNombre").value;
  let cedula = document.getElementById("clienteCedula").value;

  if (!nombre || !cedula) {
    alert("Ingrese datos del cliente");
    return;
  }

  let contenido = "FACTURA\n\n";
  contenido += "Cliente: " + nombre + "\n";
  contenido += "Cédula: " + cedula + "\n\n";

  factura.forEach(f => {
    contenido += f.nombre + " x" + f.cantidad + " = $" + f.subtotal + "\n";
  });

  contenido += "\nTOTAL: $" + total;

  let blob = new Blob([contenido], { type: "text/plain" });
  let link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "factura.txt";
  link.click();
}

});
