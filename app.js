const express = require('express');
const cors = require('cors')
const app = express();
const morgan = require('morgan');
const rutasCliente = require('./routes/Cliente')
const rutasTrabajador = require('./routes/Trabajador')
const rutasProducto = require('./routes/Producto')
const rutasCategoria = require('./routes/Categoria')
const rutasSede = require('./routes/Sede');
const rutasPedido = require('./routes/Pedido')
const rutasReportes = require('./routes/Reportes')


const { urlencoded } = require('express');
//Rutas importe

//Middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))



//Rutas cliente
app.use('/Cliente',rutasCliente);
//Rutas trabajador
app.use('/Trabajador',rutasTrabajador);
//Rutas producto
app.use('/Producto',rutasProducto);
//Rutas categoria
app.use('/Categoria',rutasCategoria);
//Rutas sede
app.use('/Sede',rutasSede);
//Rutas pedidio
app.use('/Pedido',rutasPedido);
//Rutas Reportes
app.use('/Reportes',rutasReportes);

module.exports = app;