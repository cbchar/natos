const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Tarmina = mongoose.model('Tarima');

//metodo insertar
router.post('/insertar', (req,res,next)=>{
    const tarima = new Tarima(req.body)

    tarima.save(function(err, tarima){
        if(err){
            return next(err)
        }
        res.json(tarima)
    })
})//fin de metodo insertar

//metodo consultar
router.get('/consultar', async(req, res)=>{
    Tarima.find(function(err,tarima){
        if(err){
            return next(err)
        }
        res.json(tarima)
    })
})//fin de metodo consultar 

//metodo modificar 
router.put('/modificar/:id', async (req, res) => {
    await tarima.findById(req.params.id, function (err, tarima) {
        tarima.nombre = req.body.decripcion;
        tarima.cantidad = req.body.cantidad;
        tarima.precio = req.body.precio;
        tarima.proveedor = req.body.proveedor;
        tarima.save(function (err) {
            if (err) { res.send(err) }
            res.json(tarima);
        })
    })
})

//eliminar
router.delete('/eliminar/:id', async (req, res)=>{
    await tarima.findByIdAndRemove(req.params.id, function (err, tarima) {
        if (err) { res.send(err) }
        res.json({mensaje: 'La tarima ya no existe'})
    })
})

module.exports = router;