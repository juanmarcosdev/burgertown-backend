const express = require('express');
const cors = require("cors");
const app = express();
const morgan = require('morgan')
//Rutas importe


//Middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//Rutas
app.use('/Cliente',require('./routes/Cliente'));


module.exports = app;