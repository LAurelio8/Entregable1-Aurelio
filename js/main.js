// Lista de productos
const productos = [
  { id: 1, nombre: "Calendula Deep Cleansing Foaming Face Wash", precio: 24.0 },
  { id: 2, nombre: "Midnight Recovery Concentrate", precio: 32.0 },
  { id: 3, nombre: "Skin Rescuer", precio: 18.99 },
  {
    id: 4,
    nombre: "Cilantro & Orange Extract Pollulant Defending Mask",
    precio: 52.0,
  },
];

// Inicializar el carrito
let carrito = [];

// Cargar carrito desde localStorage si existe
document.addEventListener("DOMContentLoaded", () => {
  const savedCart = localStorage.getItem("carrito");
  if (savedCart) {
    carrito = JSON.parse(savedCart);
  }
  mostrarProductos();
  mostrarCarrito();
});

// Función para guardar el carrito en localStorage
const guardarCarrito = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Función para agregar productos al carrito
const agregarAlCarrito = (productoId) => {
  const producto = productos.find((p) => p.id === productoId);
  if (producto) {
    const itemEnCarrito = carrito.find((item) => item.id === productoId);
    if (itemEnCarrito) {
      itemEnCarrito.cantidad++;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito();
    mostrarCarrito();
    const carritoModal = new bootstrap.Modal(
      document.getElementById("carritoModal")
    );
    carritoModal.show();
  }
};

// Función para calcular el precio total
const calcularPrecioTotal = () => {
  return carrito.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0
  );
};

// Función para eliminar un producto del carrito
const eliminarDelCarrito = (productoId) => {
  carrito = carrito.filter((item) => item.id !== productoId);
  guardarCarrito();
  mostrarCarrito();
};

// Función para mostrar el contenido actual del carrito
const mostrarCarrito = () => {
  const carritoDetalle = document.querySelector("#carrito-detalle");
  carritoDetalle.innerHTML = "";

  if (carrito.length === 0) {
    carritoDetalle.innerHTML = "<p>Tu carrito está vacío.</p>";
  } else {
    carrito.forEach((producto) => {
      const item = document.createElement("div");
      item.className = "carrito-item";
      item.innerHTML = `
        <p>${producto.nombre} - $${producto.precio.toFixed(2)} x ${
        producto.cantidad
      }
        <button class="btn btn-danger btn-sm ms-2" data-producto-id="${
          producto.id
        }">Eliminar</button></p>
      `;
      carritoDetalle.appendChild(item);
    });

    const total = document.createElement("p");
    total.className = "carrito-total";
    total.textContent = `Total: $${calcularPrecioTotal().toFixed(2)}`;
    carritoDetalle.appendChild(total);

    document.querySelectorAll(".btn-danger").forEach((button) => {
      button.addEventListener("click", () => {
        const productoId = parseInt(button.dataset.productoId, 10);
        eliminarDelCarrito(productoId);
      });
    });
  }
};

// Función para manejar el evento de clic en los botones de "Agregar al Carrito"
const manejarAgregarAlCarrito = (event) => {
  const button = event.target;
  const productoId = parseInt(button.dataset.productoId, 10);
  agregarAlCarrito(productoId);
};

// Mostrar lista de productos disponibles
const mostrarProductos = () => {
  const section = document.querySelector("#best-seller");
  productos.forEach((producto) => {
    const item = document.createElement("article");
    item.className = "col-12 col-sm-6 col-md-6 col-lg-3";
    item.innerHTML = `
      <h3>${producto.nombre}</h3>
      <h4>$${producto.precio.toFixed(2)}</h4>
      <button class="btn-bestseller" data-producto-id="${
        producto.id
      }">Agregar al Carrito</button>
    `;
    section.appendChild(item);
  });

  document.querySelectorAll(".btn-bestseller").forEach((button) => {
    button.addEventListener("click", manejarAgregarAlCarrito);
  });
};

// Función para manejar el formulario de compra
document.getElementById("form-compra").addEventListener("submit", (event) => {
  event.preventDefault();

  // Vaciar el carrito y actualizar la vista
  carrito = [];
  guardarCarrito();
  mostrarCarrito();

  // Mostrar mensaje de agradecimiento
  const mensajeAgradecimiento = document.createElement("div");
  mensajeAgradecimiento.innerHTML = `
    <div class="alert alert-success mt-3" role="alert">
      ¡Gracias por tu compra! Tu pedido ha sido procesado correctamente.
    </div>
  `;
  const formCompraContainer = document.getElementById("form-compra-container");
  formCompraContainer.appendChild(mensajeAgradecimiento);

  // Cerrar el formulario de compra
  const compraModal = bootstrap.Modal.getInstance(
    document.getElementById("compraModal")
  );
  compraModal.hide();
});

// Bootstrap JS y dependencias
document.addEventListener("DOMContentLoaded", () => {
  const bootstrapModal = new bootstrap.Modal(
    document.getElementById("carritoModal")
  );
  const bootstrapCompraModal = new bootstrap.Modal(
    document.getElementById("compraModal")
  );
});
