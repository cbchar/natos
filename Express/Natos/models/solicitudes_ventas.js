const mongoose = require('mongoose');

const VentaSchema = mongoose.Schema({
    id: Number,
    cliente: String,
    id_tarima: Number,
    /*tarima:[{
        id_tarima: TarimaSchema.id,
    }],*/
    descripcion_tarima: String,
    cantidad_tarima: Number,
    precio_tarima: Number
})

mongoose.model('Venta', VentaSchema);