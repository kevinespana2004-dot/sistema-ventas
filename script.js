let productos = [];
let factura = [];
let total = 0;

// LOGIN
function entrar() {
  let u = user.value;
  let p = pass.value;

  if (u === "admin" && p === "123") {
    login.style.display = "none";
    panel.style.display = "block";
  } else {
    alert("Datos incorrectos");
  }
}

function salir() {
  panel.style.display = "none";
  login.style.display = "block";
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

// ACTUALIZAR SELECT
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
  let cantidad = parseInt(document.getElementById("cantidad").value);

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

// LIMPIAR BUSQUEDA
function limpiarBusqueda() {
  document.getElementById("busqueda").value = "";
  document.getElementById("resultadoBusqueda").innerHTML = "";
}

// EXPORTAR FACTURA
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
    contenido += `${f.nombre} x${f.cantidad} = $${f.subtotal}\n`;
  });

  contenido += "\nTOTAL: $" + total;

  let blob = new Blob([contenido], { type: "text/plain" });
  let link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "factura.txt";
  link.click();
}
