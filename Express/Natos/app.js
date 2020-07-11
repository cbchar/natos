var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require ('mongoose');

mongoose.connect('mongodb+srv://cbarbosa:mongo@clustermsrb-2d6nn.mongodb.net/Natos',
 {useNewUrlParser: true, useUnifiedTopology: true});

//Aqui ponemos los require para nuestros Schemas
require('./models/users');
require('./models/empleados');
require('./models/clientes');
require('./models/proveedores');
require('./models/tarimas');
require('./models/articulos');
require('./models/solicitudes_compras');
require('./models/solicitudes_ventas');

//declaración de rutas
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const empleadoRouter = require ('./routes/empleado');
const proveedorRouter = require ('./routes/proveedor');
const clienteRouter = require ('./routes/cliente');
const tarimaRouter = require ('./routes/tarima');
const articuloRouter = require ('./routes/articulo');
const solicitud_compraRouter = require('./routes/solicitud_compra');
const solicitud_ventaRouter = require('./routes/solicitud_venta');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//declarando como usaremos las rutas
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/empleado', empleadoRouter);
app.use('/proveedor', proveedorRouter);
app.use('/cliente', clienteRouter);
app.use('/tarima', tarimaRouter);
app.use('/articulo', articuloRouter);
app.use('/solicitud_compra', solicitud_compraRouter);
app.use('/solicitud_venta', solicitud_ventaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
