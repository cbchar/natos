const mongoose = require('mongoose');

const ProveedorSchema = new mongoose.Schema({
    id: Number,
    empresa: String,
    persona_contacto:{
        nombre: String,
        apellidos: String,
        puesto: String
    },
    rfc: String,
    tipo_persona: String //fisica o moral
})

mongoose.model('Proveedor', ProveedorSchema);
