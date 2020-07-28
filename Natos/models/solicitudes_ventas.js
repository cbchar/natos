const mongoose = require('mongoose');

const VentaSchema = mongoose.Schema({
    id: Number,
    cliente: String,
    id_tarima: Number,
    descripcion_tarima: String,
    cantidad: Number,
    precio_tarima: Number
})

mongoose.model('Venta', VentaSchema);