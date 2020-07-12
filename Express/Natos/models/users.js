const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
mongoose.set('useCreateIndex', true);

const UsuarioSchema = mongoose.Schema({
    codigo: {
        type: Number,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true
        
    }
})

mongoose.model('Usuario', UsuarioSchema);