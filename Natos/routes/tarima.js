const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Tarmina = mongoose.model('Tarima');

//metodo para insertar
router.post('/insertar', (req,res,next)=>{
    const tarima = new Tarima(req.body)
    tarima.save(function(err, tarima){
        if(err){
            return next(err)
        }
        res.json(tarima)
    })
}) //terminación de metodo insertar

//metodo consultar
router.get('/consultar', async(req, res)=>{
    Tarima.find(function(err,tarima){
        if(err){
            return next(err)
        }
        res.json(tarima)
    })
}) //fin de metodo consultar 

//metodo modificar 
router.put('/modificar', async (req, res) => {
    const tarima = await Tarima.findOneAndUpdate(
        { id: req.body.id },
        {
            id: req.body.id,
            descripcion: req.body.descripcion,
            tipo: req.body.tipo,
            cantidad: req.body.cantidad,
            precio: req.body.precio
        },
        {
            new: true
        })
    res.send(proveedor);
  }) //Fin del metodo modificar

//eliminar
router.post('/eliminar', async (req, res) => { //se hace el borrado con post para usar el body
    await Tarima.findOneAndDelete({ codigo: req.body.codigo }, function
        (err, tarima) {
        if (err) { res.send(err) }
        res.json({ Mensaje: 'El articulo ha sido eliminado' })
    })
  })//fin del metodo eliminar

module.exports = router;