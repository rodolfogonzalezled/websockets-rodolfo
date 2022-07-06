const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const handlebars = require("express-handlebars");
const ProductContainer = require("./productContainer");
app.use(express.static("public"));

app.engine(
    "hbs",
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "main.hbs",
    })
);

app.set("views", "./public/views");
app.set("view engine", "hbs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Conexión del Servidor ------------------------------------------------------
const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http con Websockets escuchando en el puerto ${connectedServer.address().port}`)
});
connectedServer.on("error", error => console.log(`Error en servidor ${error}`));
// ---------------------------------------------------------------------------------

let mensajes = [];
const products = new ProductContainer();

io.on("connection", (socket) => {

    console.log(`Nuevo cliente conectado ${socket.id}`);

    socket.emit("mensajes", mensajes);

    socket.on('mensajeNuevo', data => {
        mensajes.push(data);

        io.sockets.emit('mensajes', mensajes);
    });
    socket.on("borrarMensajes", (autor) => {
        mensajes = mensajes.filter((m) => m.autor != autor);
        io.sockets.emit("mensajes", mensajes);
    });

    socket.emit("productos", products.getAll());

    socket.on('productoNuevo', data => {
        products.add(data);
        io.sockets.emit('productos', products.getAll());
    });
});

app.get("/", (req, res) => {
    res.render("index");
});
// ---------------------------------------------------------------------------------