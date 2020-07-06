const mongoose = require('mongoose');

const CompraSchema = mongoose.Schema({
    id: Number,
    proveedor: String,
    id_articulo: Number,
    descripcion_articulo: String,
    cantidad_articulo: Number,
    precio_articulo: Number
})

mongoose.model('Compra', CompraSchema);