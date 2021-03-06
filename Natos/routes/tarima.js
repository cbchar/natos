const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Tarima = mongoose.model('Tarima');

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

//metodo consultar todo
router.get('/consultar', async(req, res)=>{
    Tarima.find(function(err,tarima){
        if(err){
            return next(err)
        }
        res.json(tarima)
    })
}) //fin de metodo consultar todo

//metodo consultar por id
router.get('/consultarid/:codigo', async (req, res) => {
    const tarima = await Tarima.findOne({ id: req.body.id })

    if (tarima) { return res.send(tarima) }
    return res.send("La tarima no existe")
})

//metodo modificar 
router.put('/modificar', async (req, res) => {
    const tarima = await Tarima.findOneAndUpdate(
        { id: req.body.id },
        {
            id:req.body.id,
            descripcion: req.body.descripcion,
            tipo: req.body.tipo,
            cantidad: req.body.cantidad,
            precio: req.body.precio,
        },
        {
            new: true
        })
    res.send(tarima);
  }) //Fin del metodo modificar

//eliminar
router.post('/eliminar', async (req, res) => { //se hace el borrado con post para usar el body
    await Tarima.findOneAndDelete({ id: req.body.id }, function
        (err, tarima) {
        if (err) { res.send(err) }
        res.json({ Mensaje: 'El artículo ha sido eliminado' })
    })
  })//fin del metodo eliminar//fin del metodo eliminar

module.exports = router;