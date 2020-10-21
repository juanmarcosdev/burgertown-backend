const express = require('express');
const cors = require("cors");
const app = express();
const morgan = require('morgan');
const rutasCliente = require('./routes/Cliente')
const rutasTrabajador = require('./routes/Trabajador')
const rutasProducto = require('./routes/Producto')
const rutasTrabajador = require('./routes/Categoria')

//Rutas importe

//Middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//Rutas cliente
app.use('/Cliente',rutasCliente);
//Rutas trabajador
app.use('/Trabajador',rutasTrabajador);
//Rutas producto
app.use('/Producto',rutasProducto);
//Rutas trabajador
app.use('/Categoria',rutasCategoria);

module.exports = app;