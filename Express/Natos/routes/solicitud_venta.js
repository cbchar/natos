var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Venta = mongoose.model('Venta');

//metodo insertar
router.post('/insertar', (req,res,next)=>{
    const venta = new Venta(req.body)
    venta.save(function(err, venta){
        if(err){
            return next(err)
        }
        res.json(venta)
    })
})//fin de metodo insertar


//metodo consultar
router.get('/consultar', async(req, res)=>{
    Venta.find(function(err,venta){
        if(err){
            return next(err)
        }
        res.json(venta)
    })
})//fin de metodo consultar 

module.exports = router;