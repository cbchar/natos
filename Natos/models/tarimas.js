const mongoose = require('mongoose');

const TarimaSchema = new mongoose.Schema({
    id: Number,
    descripcion: String,
    tipo: String,
    cantidad: Number,
    precio: Number
})

mongoose.model('Tarima', TarimaSchema);