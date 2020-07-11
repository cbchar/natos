const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    id: Number,
    empresa: String,
    persona_contacto:{
        nombre: String,
        apellido_paterno: String,
        apellido_materno: String,
        puesto: String
    },
    rfc: String,
    tipo_persona: String //fisica o moral
})

mongoose.model('Cliente', ClienteSchema);