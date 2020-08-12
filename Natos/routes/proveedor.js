var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Proveedor = mongoose.model('Proveedor');

//metodo para insertar
router.post('/insertar', (req,res,next)=>{
    const proveedor = new Proveedor(req.body)
    proveedor.save(function(err, proveedor){
        if(err){
            return next(err)
        }
        res.json(proveedor)
    })
}) //terminación de metodo insertar

//metodo consultar todo
router.get('/consultar', async(req, res)=>{
    Proveedor.find(function(err,proveedor){
        if(err){
            return next(err)
        }
        res.json(proveedor)
    })
}) //fin del metodo consultar todo

// metodo consultar por id
router.get('/consultarid/:codigo', async (req, res) => {
    const proveedor = await Proveedor.findOne({ id: req.body.id })

    if (proveedor) { return res.send(proveedor) }
    return res.send("El proveedor no existe")
}) //fin de metodo consultar por id

//metodo modificar
router.put('/modificar', async (req, res) => {
    const proveedor = await Proveedor.findOneAndUpdate(
        { id: req.body.id },
        {
            empresa: req.body.empresa,
            nombre: req.body.nombre,
            apellido_paterno: req.body.apellido_paterno,
            apellido_materno: req.body.apellido_materno,
            puesto: req.body.puesto,
            rfc: req.body.rfc,
            tipo_persona: req.body.tipo_persona
        },
        {
            new: true
        })
    res.send(proveedor);
  }) //Fin del metodo modificar

//metodo eliminar
router.post('/eliminar', async (req, res) => { //se hace el borrado con post para usar el body
    await Proveedor.findOneAndDelete({ id: req.body.id }, function
        (err, proveedor) {
        if (err) { res.send(err) }
        res.json({ Mensaje: 'El cliente ha sido eliminado' })
    })
  })//fin del metodo eliminar


module.exports = router;
