function guardarProducto() {
    const title = document.getElementById("title");
    const price = document.getElementById("price");
    const thumbnail = document.getElementById("thumbnail");

    socket.emit("productoNuevo", {
        title: title.value,
        price: price.value,
        thumbnail: thumbnail.value
    });

    title.value = "";
    price.value = "";
    thumbnail.value = "";
    return false;
}

socket.on("productos", (productos) => {
    if (productos.length > 0) {
        document.getElementById('sinProductos').style.display = 'none';
        document.getElementById('tablaProductos').style.display = 'block';
        let productosHtml = productos
            .map((producto) =>
                `<tr>
                    <td>${producto.title}</td>
                    <td>${producto.price}</td>
                    <td><img style="border-radius: 8%; width: 35%; border: solid 1px" src="${producto.thumbnail}"></td>
                </tr>`)
            .join(" ");

        document.getElementById("listaProductos").innerHTML = productosHtml;
    } else {
        document.getElementById('tablaProductos').style.display = 'none';
    }
});
