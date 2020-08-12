var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente');

//metodo para insertar
router.post('/insertar', (req,res,next)=>{
    const cliente = new Cliente(req.body)
    cliente.save(function(err, cliente){
        if(err){
            return next(err)
        }
        res.json(cliente)
    })
})//terminación de metodo insertar
    
    
//metodo consultar todo
router.get('/consultar', async(req,res,next)=>{//=> funcion anonima
    await Cliente.find((err, cliente)=>{
        if(err){
            return next(err)
        }
        res.json(cliente)
    })
})//terminacion de metodo consultar todo

//consultar por id
router.get('/consultarid/:codigo', async (req, res) => {
    const cliente = await Cliente.findOne({ id: req.body.id })

    if (cliente) { return res.send(cliente) }
    return res.send("El cliente no existe")
}) //fin de metodo consultar por id

//metodo modificar
router.put('/modificar', async (req, res) => {
    const cliente = await Cliente.findOneAndUpdate(
        { id: req.body.id },
        {
            id:req.body.id,
            empresa:req.body.empresa,
            nombre:req.body.nombre,
            apellido_paterno:req.body.apellido_paterno,
            apellido_materno:req.body.apellido_materno,
            puesto:req.body.puesto,
            rfc:req.body.rfc,
            tipo_persona:req.body.tipo_persona //fisica o moral
        }, {
        new: true
    })
    res.send(cliente);
}) //Fin del metodo modificar

//metodo eliminar
router.post('/eliminar', async (req, res) => { //se hace el borrado con post para usar el body
    await Cliente.findOneAndDelete({ id: req.body.id }, function
        (err, cliente) {
        if (err) { res.send(err) }
        res.json({ Mensaje: 'El cliente ha sido eliminado' })
    })
  })//fin del metodo eliminar

module.exports = router;
