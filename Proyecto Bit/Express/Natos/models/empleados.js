const mongoose = require ('mongoose');

const EmpleadoSchema = new mongoose.Schema({
    id: Number,
    nombre: String,
    apellido_paterno: String,
    apellido_materno: String,
    puesto: String,
    sueldo: Number
    //usuario y contraseña van en una ruta diferente
    //usuario: String,
    //contrasenia: String
})


mongoose.model('Empleado', EmpleadoSchema);