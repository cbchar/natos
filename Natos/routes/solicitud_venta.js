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

//metodo consultar todo
router.get('/consultar', async(req, res)=>{
    Venta.find(function(err,venta){
        if(err){
            return next(err)
        }
        res.json(venta)
    })
})//fin de metodo consultar todo

//consultar por id
router.get('/consultarid/:codigo', async (req, res) => {
    const venta = await Venta.findOne({ id: req.body.id })

    if (venta) { return res.send(venta) }
    return res.send("La solicitud de venta no existe")
}) //fin de metodo consultar por id

//metodo modificar
router.put('/modificar', async (req, res) => {
  const venta = await Venta.findOneAndUpdate(
      { id: req.body.id },
      {
        cliente: req.body.cliente,
        id_tarima: req.body.id_tarima,
        descripcion_tarima:req.body.descripcion_tarima,
        cantidad:req.body.cantidad,
        precio_tarima:req.body.precio_tarima
      },
      {
          new: true
      })
  res.send(venta);
})


//metodo eliminar
router.post('/eliminar', async (req, res) => { //se hace el borrado con post para usar el body
  await Venta.findOneAndDelete({ id: req.body.id }, function
      (err, venta) {
      if (err) { res.send(err) }
      res.json({ Mensaje: 'La solicitud de venta ha sido eliminada' })
  })
})//fin del metodo eliminar


module.exports = router;