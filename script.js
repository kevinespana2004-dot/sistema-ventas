let productos = [];
let factura = [];
let total = 0;

let usuarios = [
  { user: "admin", pass: "123" }
];

// LOGIN
function entrar() {
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  let encontrado = usuarios.find(x => x.user === u && x.pass === p);

  if (encontrado) {
    document.getElementById("login").style.display = "none";
    document.getElementById("panel").style.display = "block";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

function salir() {
  document.getElementById("panel").style.display = "none";
  document.getElementById("login").style.display = "block";
}

// REGISTRO
function mostrarRegistro() {
  let reg = document.getElementById("registro");
  if (reg.style.display === "none") {
    reg.style.display = "block";
  } else {
    reg.style.display = "none";
  }
}

function registrar() {
  let u = document.getElementById("nuevoUser").value;
  let p = document.getElementById("nuevoPass").value;

  if (!u || !p) {
    alert("Complete los datos");
    return;
  }

  usuarios.push({ user: u, pass: p });
  alert("Usuario creado correctamente");

  document.getElementById("nuevoUser").value = "";
  document.getElementById("nuevoPass").value = "";
}

// NAVEGACIÓN
function mostrar(seccion) {
  let secciones = document.querySelectorAll(".seccion");
  secciones.forEach(s => s.style.display = "none");

  document.getElementById(seccion).style.display = "block";
}

// INVENTARIO
function agregarProducto() {
  let nombre = document.getElementById("nombre").value;
  let precio = parseFloat(document.getElementById("precio").value);

  if (!nombre || !precio) return;

  productos.push({ nombre, precio });

  let li = document.createElement("li");
  li.textContent = nombre + " - $" + precio;

  document.getElementById("listaProductos").appendChild(li);

  actualizarSelect();
}

// ACTUALIZAR SELECT
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
function agregarFactura() {
  let i = document.getElementById("productoSelect").value;
  let cantidad = parseInt(document.getElementById("cantidadInput").value);

  if (i === "" || !cantidad) return;

  let prod = productos[i];
  let subtotal = prod.precio * cantidad;

  factura.push({ ...prod, cantidad, subtotal });
  total += subtotal;

  let li = document.createElement("li");
  li.textContent = prod.nombre + " x" + cantidad + " = $" + subtotal;

  document.getElementById("facturaLista").appendChild(li);
  document.getElementById("total").textContent = total;
}

// NUEVA FACTURA
function nuevaFactura() {
  factura = [];
  total = 0;

  document.getElementById("facturaLista").innerHTML = "";
  document.getElementById("total").textContent = "0";

  document.getElementById("clienteNombre").value = "";
  document.getElementById("clienteCedula").value = "";
  document.getElementById("cantidadInput").value = "";

  alert("Nueva factura iniciada");
}

// BUSCAR
function buscarProducto() {
  let texto = document.getElementById("busqueda").value.toLowerCase();
  let lista = document.getElementById("resultadoBusqueda");

  lista.innerHTML = "";

  productos.forEach(p => {
    if (p.nombre.toLowerCase().includes(texto)) {
      let li = document.createElement("li");
      li.textContent = p.nombre;
      lista.appendChild(li);
    }
  });
}

// LIMPIAR BUSQUEDA
function limpiarBusqueda() {
  document.getElementById("busqueda").value = "";
  document.getElementById("resultadoBusqueda").innerHTML = "";
}

// EXPORTAR
function exportar() {

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
