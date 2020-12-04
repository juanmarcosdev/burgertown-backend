const {Router} = require('express')
const router = Router();
const {createCliente,getClientes,getCliente, stateCliente, editCliente, loginCliente} = require('../controllers/cliente.controller');
const { createTarjeta, stateTarjeta} = require('../controllers/tarjeta.controller');
const autorizacionTrabajador = require("../middleware/autorizacionTrabajador");
const { validarCliente, validarTarjeta } = require('../middleware/validaciones');
const autorizacionCliente = require('../middleware/autorizacionCliente')
const {getTarjetasCliente} = require('../controllers/tarjeta.controller')



//    /api/Cliente...
router.post('/Create',validarCliente,createCliente);
router.get('/Get',getClientes);
router.post('/Tarjeta/Add',validarTarjeta,createTarjeta);
router.get('/Metodos/:cliente_id',getTarjetasCliente)

//    /api/:cliente_celular
router.get('/:cliente_celular',getCliente);
router.put('/:cliente_id',stateCliente);
router.put('/Edit/:cliente_id',editCliente);
router.put('/Login/:cliente_celular',loginCliente);
router.put('/Tarjeta/Estado/:tarjeta_id',stateTarjeta);

/*
//    /api/Cliente...
router.post('/Create',validarCliente,createCliente);
router.get('/Get',autorizacionTrabajador,getClientes);
router.post('/Tarjeta/Add',autorizacionCliente,createTarjeta);

//    /api/:cliente_celular
router.get('/:cliente_id',autorizacionTrabajador,getCliente);
router.put('/:cliente_id',autorizacionTrabajador,stateCliente);
router.put('/Edit/:cliente_id',autorizacionTrabajador,editCliente);
router.put('/Login/:cliente_celular',loginCliente);
*/

module.exports = router;
