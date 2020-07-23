const mongoose = require ('mongoose');

const EmpleadoSchema = new mongoose.Schema({
    id: Number,
    nombre: String,
    apellido_paterno: String,
    apellido_materno: String,
    puesto: String,
    sueldo: Number
})


mongoose.model('Empleado', EmpleadoSchema);