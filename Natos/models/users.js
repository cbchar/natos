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

UsuarioSchema.methods.generatorJWT=function(){
    return jwt.sign({
        codigo:this.codigo,
        username:this.username
    }, "contr4s3n14")
}

mongoose.model('Usuario', UsuarioSchema);