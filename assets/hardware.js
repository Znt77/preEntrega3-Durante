const productList = [];

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedor = document.querySelector(".productos .row");
console.log(contenedor);

function mostrarProductos() {
    contenedor.innerHTML = '';

    productList.forEach( p => {
        const div = document.createElement("div");
        div.classList.add("col");

        div.innerHTML = `
            <div class="card shadow-sm text-bg-dark">
                <img src="${p.image}" class="escalar">
                <div class="card-body">
                    <h5 class="card-title">${p.nombre}</h5>
                    <p class="card-text">$ ${p.precio}</p>
                    <div class="d-flex justify-content-between align-items-center" id="contenedor-${p.id}">
                        <div class="btn-group">
                            <button class="btn btn-primary">Detalles</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const buttonAgregar = document.createElement("button");
        buttonAgregar.classList.add("btn","btn-success");
        buttonAgregar.innerText = "Agregar";

        buttonAgregar.addEventListener("click",()=>{
            carrito.push(p);
            localStorage.setItem("carrito", JSON.stringify(carrito));
        });

        contenedor.appendChild(div);

        const contenedorBoton = document.querySelector("#contenedor-" + p.id);
        contenedorBoton.appendChild(buttonAgregar);
    });
}

mostrarProductos();

const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const inputDeImagen = document.getElementById("imagen");
    const archivoImagen = inputDeImagen.files[0];

    if (!archivoImagen) {
        alert("Selecciona una imagen.");
        return;
    }

    const nuevoProducto = {
        id: productList.length + 1,
        image: URL.createObjectURL(archivoImagen),
        precio: precio,
        nombre: nombre
    };

    productList.push(nuevoProducto);
    console.log("Producto agregado:", nuevoProducto);
    console.log("Nueva lista de productos:", productList);

    mostrarProductos();

    productForm.reset();
})