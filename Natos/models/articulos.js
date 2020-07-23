const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ArticuloSchema = new mongoose.Schema({
    id: Number,
    descripcion: String,
    cantidad: Number,
    precio: Number,
    proveedor: [{ type: Schema.Types.ObjectId, ref: 'Proveedor' }]
})

mongoose.model('Articulo', ArticuloSchema);