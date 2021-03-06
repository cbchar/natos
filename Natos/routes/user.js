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
    return res.status(400).send('Usuario ya existe')
  }
  const salt = await bcrypt.genSalt(10)
  const passcifrado = await bcrypt.hash(req.body.password, salt)
  usuario = new Usuario({
    codigo: req.body.codigo,
    username: req.body.username,
    password: passcifrado,
  });
  await usuario.save()
  res.status(200).send(usuario)
}) //termina metodo registrar


//metodo iniciar sesion
router.post('/login', [
  check('username').isLength({ min: 1 }),
  check('password').isLength({ min: 1 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let usuario = await Usuario.findOne({ username: req.body.username })

  if (!usuario) {
    return res.status(400).send('usuario o contraseña incorrectos')
  }

  const validaPassword = await bcrypt.compare(req.body.password, usuario.password)

  if (!validaPassword) {
    return res.status(400).send('usuario o contraseña incorrectos')
  }

  const jwtoken = usuario.generatorJWT();
  res.status(201).send({ jwtoken })

}) //termina metodo login

module.exports = router;
