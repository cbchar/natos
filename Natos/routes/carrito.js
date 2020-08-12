var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Carrito = mongoose.model('Carrito');

//metodo insertar
router.post('/insertar', (req,res,next)=>{
    const carrito = new Carrito(req.body)
    carrito.save(function(err, carrito){
        if(err){
            return next(err)
        }
        res.json(carrito)
    })
})//fin de metodo insertar

//metodo consultar todo
router.get('/consultar', async(req, res)=>{
    Carrito.find(function(err,carrito){
        if(err){
            return next(err)
        }
        res.json(carrito)
    })
})//fin de metodo consultar todo

module.exports = router;
