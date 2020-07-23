var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');

const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

//metodo para registrar un usuario
router.post('/registrar', [
    check('codigo').isLength({ min: 1 }),
    check('username').isLength({ min: 1 }),
    check('password').isLength({ min: 1 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let usuario = await Usuario.findOne({ username: req.body.username })
    if (usuario) {
        return res.status(400).send('¡Este usuario ya existe, intenta con otro!')
    }
    const salt = await bcrypt.genSalt(10)
    const passcifrado = await bcrypt.hash(req.body.password, salt) //encripta el password
    usuarios = new Usuario({
        codigo: req.body.codigo,
        username: req.body.username,
        password: passcifrado,
    });
    await usuarios.save()
    res.status(200).send(usuarios)
}) //termina metodo registrar


//metodo iniciar sesion
router.post('/login', [
    check('username').isLength({ min: 1 }),
    check('password').isLength({ min: 1 }),
    ],
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    let usuario = await Usuario.findOne({ username: req.body.username })
    if (!usuario) {
        return res.status(400).send('Usuario o contraseña incorrectos')
    }
    const validaPassword = await bcrypt.compare(req.body.password, usuario.password)
    if (!validaPassword) {
        return res.status(400).send('Usuario o contraseña incorrectos')
    }
    const jwtoken = usuario.generadorJWT();
    //res.status(201).header('Authorization',jwtoken).send("Bienvenido")
    res.status(201).send({ jwtoken })
}) //termina metodo login

module.exports = router;
