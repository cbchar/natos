var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Compra = mongoose.model('Compra');

//metodo insertar
router.post('/insertar', (req,res,next)=>{
    const compra = new Compra(req.body)
    compra.save(function(err, empleado){
        if(err){
            return next(err)
        }
        res.json(compra)
    })
})//fin de metodo insertar

//metodo consultar
router.get('/consultar', async(req, res)=>{
    Compra.find(function(err,compra){
        if(err){
            return next(err)
        }
        res.json(compra)
    })
})//fin de metodo consultar 

module.exports = router;
