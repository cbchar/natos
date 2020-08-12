const mongoose = require ('mongoose');

const CarritoSchema = new mongoose.Schema({
    id: Number,
    name: String, 
    quantity: Number, 
    price: Number, 
    status: String
})


mongoose.model('Carrito', CarritoSchema);