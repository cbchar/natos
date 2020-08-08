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

//metodo consultar todo
router.get('/consultar', async(req, res)=>{
    Empleado.find(function(err,empleado){
        if(err){
            return next(err)
        }
        res.json(empleado)
    })
})//fin de metodo consultar todo

//consultar por id
router.get('/consultarid/:codigo', async (req, res) => {
    const empleado = await Empleado.findOne({ id: req.body.id })

    if (empleado) { return res.send(empleado) }
    return res.send("El empleado no existe")
}) //fin de metodo consultar por id

//metodo modificar
router.put('/modificar', async (req, res) => {
  const empleado = await Empleado.findOneAndUpdate(
      { id: req.body.id },
      {
          empresa:req.body.empresa,
          nombre: req.body.nombre,
          apellido_paterno: req.body.apellido_paterno,
          apellido_materno: req.body.apellido_materno,
          puesto: req.body.puesto,
          sueldo: req.body.sueldo,
      },
      {
          new: true
      })
  res.send(empleado);
})


//metodo eliminar
router.post('/eliminar', async (req, res) => { //se hace el borrado con post para usar el body
  await Empleado.findOneAndDelete({ id: req.body.id }, function
      (err, empleado) {
      if (err) { res.send(err) }
      res.json({ Mensaje: 'El empleado ha sido eliminado' })
  })
})//fin del metodo eliminar

module.exports = router;
