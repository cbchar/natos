var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Compra = mongoose.model('Compra');

//Rutas para get, post, delete y put
//metodo insertar
router.post('/insertar', (req,res,next)=>{
    const compra = new Compra(req.body)
    compra.save(function(err, compra){
        if(err){
            return next(err)
        }
        res.json(compra)
    })
})//fin de metodo insertar

//metodo consultar todo
router.get('/consultar', async(req, res)=>{
    Compra.find(function(err,compra){
        if(err){
            return next(err)
        }
        res.json(compra)
    })
})//fin de metodo consultar todo

//consultar por id
router.get('/consultarid/:codigo', async (req, res) => {
    const compra = await Compra.findOne({ id: req.body.id })

    if (compra) { return res.send(compra) }
    return res.send("La solicitud de compra no existe")
}) //fin de metodo consultar por id

//metodo modificar
router.put('/modificar', async (req, res) => {
  const compra = await Compra.findOneAndUpdate(
      { id: req.body.id },
      {
          proveedor:req.body.proveedor,
          id_articulo: req.body.id_articulo,
          descripcion_articulo: req.body.descripcion_articulo,
          cantidad_articulo: req.body.cantidad_articulo,
          precio_articulo: req.body.precio_articulo,
      },
      {
          new: true
      })
  res.send(compra);
})


//metodo eliminar
router.post('/eliminar', async (req, res) => { //se hace el borrado con post para usar el body
  await Compra.findOneAndDelete({ id: req.body.id }, function
      (err, compra) {
      if (err) { res.send(err) }
      res.json({ Mensaje: 'La solicitud de compra ha sido eliminada' })
  })
})//fin del metodo eliminar

module.exports = router;
