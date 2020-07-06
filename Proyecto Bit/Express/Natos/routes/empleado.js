var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Empleado = mongoose.model('Empleado');

//Rutas para get, post, delete y put
//metodo insertar
router.post('/insertar', (req,res,next)=>{
    const empleado = new Empleado(req.body)
    empleado.save(function(err, empleado){
        if(err){
            return next(err)
        }
        res.json(empleado)
    })
})//fin de metodo insertar

//metodo consultar
router.get('/consultar', async(req, res)=>{
    Empleado.find(function(err,empleado){
        if(err){
            return next(err)
        }
        res.json(empleado)
    })
})//fin de metodo consultar 

//metodo modificar
router.put('/modificar/:id', async (req,res)=>{
    await Empleado.findById(req.params.id,function(err,empleado){
      Empleado.nombre=req.body.nombre;
      Empleado.apellido_paterno=req.body.apellido_paterno;
      Empleado.apellido_materno=req.body.apellido_materno;
      Empleado.puesto=req.body.puesto;
      Empleado.sueldo=req.body.sueldo;
      Empleado.save(function(err){
        if(err){res.send(err)}
        res.json(empleado);
      })
    })
  })

//metodo eliminar
router.delete('/modificar/:id',async(req,res)=>{
    await Empleado.findByIdAndRemove(req.params.id,function(err,Empleado){
    if(err){res.send(err)}
    res.json({mensaje:'Empleado Despedido'})
  })
})//fin del metodo eliminar



module.exports = router;
