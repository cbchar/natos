var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

//metodo para insertar
router.post('/insertar', async (req, res) => {
    let cliente = await Cliente.findOne(
        { id: req.body.id })
    if (cliente) {
        return res.send("Este cliente ya existe, ingresa otro.")
    }
    cliente = new Cliente({
        id: req.body.id,
        empresa: req.body.empresa,
        persona_contacto: {
            nombre: req.body.nombre,
            apellido_paterno: req.body.apellido_paterno,
            apellido_materno: req.body.apellido_materno,
            puesto: req.body.puesto
        },
        rfc: req.body.rfc,
        tipo_persona: req.body.tipo_persona //fisica o moral
    })
    await cliente.save()
    res.status(201).send(cliente)
}) //terminación de metodo insertar

//metodo consultar
router.get('/consultar', async (req, res, next) => {//=> funcion anonima
    await Cliente.find((err, cliente) => {
        if (err) {
            return next(err)
        }
        res.json(cliente)
    })
}) //fin del metodo consultar

//metodo modificar
router.put('/modificar/:id', async (req, res) => {
    const cliente = await Cliente.findOneAndUpdate(
        { id: req.params.id },
        {
            id: req.body.id,
            empresa: req.body.empresa,
            persona_contacto: {
                nombre: req.body.nombre,
                apellido_paterno: req.body.apellido_paterno,
                apellido_materno: req.body.apellido_materno,
                puesto: req.body.puesto
            },
            rfc: req.body.rfc,
            tipo_persona: req.body.tipo_persona //fisica o moral
        }, {
        new: true
    })
    res.send(cliente);
}) //Fin del metodo modificar

//metodo eliminar
router.delete('/modificar/:id', async (req, res) => {
    await Cliente.findByIdAndRemove(req.params.id, function (err, Cliente) {
        if (err) { res.send(err) }
        res.json({mensaje: 'El cliente ha sido eliminado satisfactoriamente'})
    })
})//fin del metodo eliminar

module.exports = router;
