let productos = [];
let factura = [];
let total = 0;

let usuarios = [
  { user: "admin", pass: "123" }
];

// LOGIN
function entrar() {
  let u = user.value;
  let p = pass.value;

  let encontrado = usuarios.find(x => x.user === u && x.pass === p);

  if (encontrado) {
    login.style.display = "none";
    panel.style.display = "block";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

function salir() {
  panel.style.display = "none";
  login.style.display = "block";
}

// REGISTRO
function mostrarRegistro() {
  let reg = document.getElementById("registro");
  reg.style.display = reg.style.display === "none" ? "block" : "none";
}

function registrar() {
  let u = document.getElementById("nuevoUser").value;
  let p = document.getElementById("nuevoPass").value;

  if (!u || !p) {
    alert("Complete los datos");
    return;
  }

  usuarios.push({ user: u, pass: p });
  alert("Usuario creado");

  nuevoUser.value = "";
  nuevoPass.value = "";
}

// NAVEGACIÓN
function mostrar(seccion) {
  document.querySelectorAll(".seccion").forEach(s => s.style.display = "none");
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
  listaProductos.appendChild(li);

  actualizarSelect();
}

function actualizarSelect() {
  productoSelect.innerHTML = "";

  productos.forEach((p, i) => {
    let option = document.createElement("option");
    option.value = i;
    option.text = p.nombre;
    productoSelect.appendChild(option);
  });
}

// FACTURA
function agregarFactura() {
  let i = productoSelect.value;
  let cantidad = parseInt(cantidad.value);

  if (i === "" || !cantidad) return;

  let prod = productos[i];
  let subtotal = prod.precio * cantidad;

  factura.push({ ...prod, cantidad, subtotal });
  total += subtotal;

  let li = document.createElement("li");
  li.textContent = `${prod.nombre} x${cantidad} = $${subtotal}`;
  facturaLista.appendChild(li);

  document.getElementById("total").textContent = total;
}

function nuevaFactura() {
  factura = [];
  total = 0;

  facturaLista.innerHTML = "";
  document.getElementById("total").textContent = "0";

  clienteNombre.value = "";
  clienteCedula.value = "";
  cantidad.value = "";

  alert("Nueva factura lista");
}

// BUSCAR
function buscarProducto() {
  let texto = busqueda.value.toLowerCase();
  resultadoBusqueda.innerHTML = "";

  productos.forEach(p => {
    if (p.nombre.toLowerCase().includes(texto)) {
      let li = document.createElement("li");
      li.textContent = p.nombre;
      resultadoBusqueda.appendChild(li);
    }
  });
}

function limpiarBusqueda() {
  busqueda.value = "";
  resultadoBusqueda.innerHTML = "";
}

// EXPORTAR
function exportar() {

  let nombre = clienteNombre.value;
  let cedula = clienteCedula.value;

  if (!nombre || !cedula) {
    alert("Ingrese datos del cliente");
    return;
  }

  let contenido = "FACTURA\n\n";
  contenido += "Cliente: " + nombre + "\n";
  contenido += "Cédula: " + cedula + "\n\n";

  factura.forEach(f => {
    contenido += `${f.nombre} x${f.cantidad} = $${f.subtotal}\n`;
  });

  contenido += "\nTOTAL: $" + total;

  let blob = new Blob([contenido], { type: "text/plain" });
  let link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "factura.txt";
  link.click();
}
