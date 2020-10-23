const express = require('express');
const cors = require("cors");
const app = express();
const morgan = require('morgan');
const rutasCliente = require('./routes/Cliente')
const rutasTrabajador = require('./routes/Trabajador')
const rutasProducto = require('./routes/Producto')
const rutasCategoria = require('./routes/Categoria')
const rutasSede = require('./routes/Sede')
//Rutas importe

//Middlewares
// app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


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

module.exports = app;