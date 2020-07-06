var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Proveedor = mongoose.model('Proveedor');

//metodo para insertar
router.post('/insertar', async (req, res) => {
    let proveedor = await Proveedor.findOne(
        { id: req.body.id })
    if (proveedor) {
        return res.send("Este proveedor ya existe, ingresa otro.")
    }
    proveedor = new Proveedor({
        id: req.body.id,
        empresa: req.body.empresa,
        persona_contacto: {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            puesto: req.body.puesto
        },
        rfc: req.body.rfc,
        tipo_persona: req.body.tipo_persona //fisica o moral
    })
    await proveedor.save()
    res.status(201).send(proveedor)
}) //terminación de metodo insertar

//metodo consultar
router.get('/consultar', async (req, res, next) => {//=> funcion anonima
    await Proveedor.find((err, proveedor) => {
        if (err) {
            return next(err)
        }
        res.json(proveedor)
    })
}) //fin del metodo consultar

//metodo modificar
router.put('/modificar/:id', async (req, res) => {
    const proveedor = await Proveedor.findOneAndUpdate(
        { id: req.params.id },
        {
            id: req.body.id,
            empresa: req.body.empresa,
            persona_contacto: {
                nombre: req.body.nombre,
                apellidos: req.body.apellidos,
                puesto: req.body.puesto
            },
            rfc: req.body.rfc,
            tipo_persona: req.body.tipo_persona //fisica o moral  
        }, {
        new: true
    })
    res.send(proveedor);
}) //Fin del metodo modificar

//metodo eliminar
router.delete('/modificar/:id',async(req,res)=>{
    await Empleado.findByIdAndRemove(req.params.id,function(err,Empleado){
    if(err){res.send(err)}
    res.json({mensaje:'Empleado Despedido'})
  })
})//fin del metodo eliminar


module.exports = router;
