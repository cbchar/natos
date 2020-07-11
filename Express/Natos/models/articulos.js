const mongoose = require('mongoose');

const ArticuloSchema = new mongoose.Schema({
    id: Number,
    descripcion: String,
    cantidad: Number,
    proveedor: String,
    precio: Number,
})

mongoose.model('Articulo', ArticuloSchema);

//hace falta ruta y Schema para solicitudes de compra y solicitudes de venta.