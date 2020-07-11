var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');


//metodo iniciar sesion
router.post('/login',[
    check('username').isLength({min:10}),
    check('password').isLength({min:1}),
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    let usuario = await Usuario.findOne({username: req.body.username})

    if(!usuario){
        return res.status(400).send('Usuario o contraseña incorrectos')
    }

    const validaPassword = await bcrypt.compare(req.body.password, usuario.password)

    if(!validaPassword){
        return res.status(400).send('Usuario o contraseña incorrecto')
    }


    const jwtoken = usuario.generadorJWT();
    //res.status(201).header('Authorization',jwtoken).send("Bienvenido")
    res.status(201).send({jwtoken})

})



module.exports = router;
