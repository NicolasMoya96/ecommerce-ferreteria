// Selección de elementos del DOM
const productosContainer = document.querySelector("#productos-container");
const carritoContainer = document.querySelector("#carrito-container");
const totalCarrito = document.querySelector("#total-carrito");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");

// Variable para almacenar los productos en el carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Productos disponibles (simulación de base de datos)
const productos = [
    { id: 1, nombre: "Taladro", precio: 120000, imagen: "images/taladro.jpg" },
    { id: 2, nombre: "Destornillador", precio: 15000, imagen: "images/destornillador.jpg" },
    { id: 3, nombre: "Martillo", precio: 25000, imagen: "images/martillo.jpg" }
];

// Función para mostrar productos en la tienda
function mostrarProductos() {
    productosContainer.innerHTML = "";
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio.toLocaleString()}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Añadir al Carrito</button>
        `;
        productosContainer.appendChild(div);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

// Función para mostrar los productos en el carrito
function actualizarCarrito() {
    carritoContainer.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
        total += producto.precio;
        const div = document.createElement("div");
        div.classList.add("item-carrito");
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h4>${producto.nombre}</h4>
            <p>$${producto.precio.toLocaleString()}</p>
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        carritoContainer.appendChild(div);
    });

    totalCarrito.textContent = `Total: $${total.toLocaleString()}`;
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

// Función para vaciar el carrito
vaciarCarritoBtn.addEventListener("click", () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
});

// Cargar productos y carrito al iniciar la página
document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos();
    actualizarCarrito();
});
