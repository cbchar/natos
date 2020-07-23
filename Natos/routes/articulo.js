var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Articulo = mongoose.model('Articulo');
const Proveedor = mongoose.model('Proveedor');

//metodo consultar
router.get('/consultar', function (req, res) {
    Articulo.find({}, function (err, articulos) {
        Proveedor.populate(articulos, { path: "proveedor" }, function (err, articulos) {
            res.status(200).send(articulos);
        });
    });
});//fin del metodo consultar

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

module.exports = router;








/*
//metodo consultar
app.get("/consultar", function (req, res) {
    Articulo.find({}, function (err, libros) {
        Proveedor.populate(articulos, { path: "proveedor" }, function (err, articulos) {
            res.status(200).send(articulos);
        });
    });
});
router.get('/consultar', async(req, res)=>{
    Articulo.find(function(err,articulo){
        if(err){
            return next(err)
        }
        res.json(articulo)
    })
})//fin de metodo consultar

//metodo modificar
router.put('/modificar', async (req, res) => {
    const articulo = await Articulo.findOneAndUpdate(
        { id: req.body.id },
        {
            descripcion: req.body.descripcion,
            cantidad: req.body.cantidad,
            proveedor: req.body.proveedor,
            precio: req.body.precio
        },
        {
            new: true
        })
    res.send(proveedor);
})

//eliminar
router.post('/eliminar', async (req, res) => { //se hace el borrado con post para usar el body
    await Articulo.findOneAndDelete({ codigo: req.body.codigo }, function
        (err, articulo) {
        if (err) { res.send(err) }
        res.json({ Mensaje: 'El articulo ha sido eliminado' })
    })
})*/