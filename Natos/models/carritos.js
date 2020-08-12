const mongoose = require ('mongoose');

const CarritoSchema = new mongoose.Schema({
    id: Number,
    name: String, 
    quantity: Number, 
    price: Number, 
    // total: Number,
    status: String,
    correo: String
})


mongoose.model('Carrito', CarritoSchema);