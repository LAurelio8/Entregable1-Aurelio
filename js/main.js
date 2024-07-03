// Lista de productos
const velas = [
  { id: 1, nombre: "Vela de Lavanda", precio: 10 },
  { id: 2, nombre: "Vela de Vainilla", precio: 12 },
  { id: 3, nombre: "Vela de Canela", precio: 8 },
  { id: 4, nombre: "Vela de Jazmín", precio: 15 },
];

// Función para agregar productos al carrito
function agregarAlCarrito(carrito, productoId, cantidad) {
  const producto = velas.find((v) => v.id === productoId);
  if (producto) {
    for (let i = 0; i < cantidad; i++) {
      carrito.push(producto);
    }
    alert(`${cantidad} ${producto.nombre} agregado(s) al carrito.`);
  } else {
    alert("Producto no encontrado.");
  }
}

// Función para calcular el precio total
function calcularPrecioTotal(carrito) {
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    total += carrito[i].precio;
  }
  return total;
}

// Función para mostrar el contenido actual del carrito
function mostrarCarrito(carrito) {
  let carritoDetalle = "Carrito de compras:\n";
  if (carrito.length === 0) {
    carritoDetalle += "Tu carrito está vacío.\n";
  } else {
    for (let i = 0; i < carrito.length; i++) {
      carritoDetalle += `${i + 1}. ${carrito[i].nombre} - $${
        carrito[i].precio
      }\n`;
    }
    carritoDetalle += `Total: $${calcularPrecioTotal(carrito)}`;
  }
  alert(carritoDetalle);
}

// Preguntar el nombre del usuario
const nombreUsuario = prompt("Por favor, ingresa tu nombre:");
alert(`¡Bienvenido/a, ${nombreUsuario}!`);

// Inicializar el carrito
let carrito = [];
let continuar = true;

while (continuar) {
  // Mostrar lista de velas disponibles
  let listaProductos = "Velas disponibles:\n";
  for (let i = 0; i < velas.length; i++) {
    listaProductos += `${velas[i].id}. ${velas[i].nombre} - $${velas[i].precio}\n`;
  }
  listaProductos += "5. Ver carrito\n6. Continuar al siguiente paso\n7. Salir";

  // Preguntar la selección de producto
  const seleccion = parseInt(prompt(listaProductos), 10);

  if (seleccion >= 1 && seleccion <= 4) {
    // Preguntar cantidad de productos
    const cantidad = parseInt(
      prompt("¿Cuántas velas deseas agregar al carrito?"),
      10
    );
    agregarAlCarrito(carrito, seleccion, cantidad);
  } else if (seleccion === 5) {
    // Mostrar carrito y total
    mostrarCarrito(carrito);
  } else if (seleccion === 6) {
    if (carrito.length === 0) {
      alert("Por favor, seleccione un producto para continuar con la compra.");
    } else {
      // Preguntar si desea finalizar la compra
      const continuarCompra = prompt(
        "¿Deseas continuar con la compra? (si/no)"
      ).toLowerCase();

      if (continuarCompra === "si") {
        // Solicitar mail y documento
        const email = prompt("Por favor, ingresa tu correo electrónico:");
        const documento = prompt(
          "Por favor, ingresa tu documento de identidad:"
        );
        alert(
          `Gracias por tu compra, ${nombreUsuario}. Recibirás un correo de confirmación en ${email}.`
        );
        continuar = false;
      } else {
        alert("Gracias por visitar nuestra tienda.");
        continuar = false;
      }
    }
  } else if (seleccion === 7) {
    continuar = false;
  } else {
    alert("Opción no válida. Por favor, selecciona una opción válida.");
  }
}

alert("Gracias por visitar nuestra tienda.");
