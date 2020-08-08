var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Articulo = mongoose.model('Articulo');

//metodo insertar
router.post('/insertar', (req,res,next)=>{
    const articulo = new Articulo(req.body)
    articulo.save(function(err, articulo){
        if(err){
            return next(err)
        }
        res.json(articulo)
    })
})//fin de metodo insertar

//metodo consultar todo
router.get('/consultar', async (req, res) => {
    Articulo.find(function (err, articulo) {
        if (err) {
            return next(err)
        }
        res.json(articulo)
    })
})//fin de metodo consultar todo 

//consultar por id
router.get('/consultarid/:codigo', async (req, res) => {
    const articulo = await Articulo.findOne({ id: req.body.id })

    if (articulo) { return res.send(articulo) }
    return res.send("El articulo no existe")
}) //fin de metodo consultar por id

//metodo modificar
router.put('/modificar', async (req, res) => {
    const articulo = await Articulo.findOneAndUpdate(
        { id: req.body.id },
        {
            descripcion: req.body.descripcion,
            cantidad: req.body.cantidad,
            proveedor: req.body.proveedor,
            precio: req.body.precio
        }, {
        new: true
    })
    res.send(articulo);
})

//eliminar
router.post('/eliminar', async (req, res) => { //se hace el borrado con post para usar el body
    await Articulo.findOneAndDelete({ id: req.body.id }, function
        (err, articulo) {
        if (err) { res.send(err) }
        res.json({ Mensaje: 'El articulo ha sido eliminado' })
    })
})//fin metodo eliminar

module.exports = router;