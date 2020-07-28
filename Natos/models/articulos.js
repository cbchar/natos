const mongoose = require('mongoose');

var ArticuloSchema = new mongoose.Schema({
    id: Number,
    descripcion: String,
    cantidad: Number,
    precio: Number,
    proveedor: String
})

mongoose.model('Articulo', ArticuloSchema);