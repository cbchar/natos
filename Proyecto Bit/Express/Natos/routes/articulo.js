var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Articulo = mongoose.model('Articulo');

//metodo insertar
router.post('/insertar', (req, res, next) => {
    const articulo = new Articulo(req.body)

    articulo.save(function (err, articulo) {
        if (err) {
            return next(err)
        }
        res.json(articulo)
    })
})//fin de metodo insertar

//metodo consultar
router.get('/consultar', async (req, res) => {
    Articulo.find(function (err, articulo) {
        if (err) {
            return next(err)
        }
        res.json(articulo)
    })
})//fin de metodo consultar 

//metodo modificar 
router.put('/modificar/:id', async (req, res) => {
    await articulo.findById(req.params.id, function (err, articulo) {
        articulo.nombre = req.body.decripcion;
        articulo.cantidad = req.body.cantidad;
        articulo.precio = req.body.precio;
        articulo.proveedor = req.body.proveedor;
        articulo.save(function (err) {
            if (err) { res.send(err) }
            res.json(articulo);
        })
    })
})

//eliminar
router.delete('/eliminar/:id', async (req, res)=>{
    await articulo.findByIdAndRemove(req.params.id, function (err, articulo) {
        if (err) { res.send(err) }
        res.json({mensaje: 'El artículo ya no existe'})
    })
})

module.exports = router;

