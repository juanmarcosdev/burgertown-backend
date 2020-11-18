const {Router} = require('express')
const router = Router();
const {createCliente,getClientes,getCliente, stateCliente, editCliente, loginCliente} = require('../controllers/cliente.controller');
const { createTarjeta } = require('../controllers/tarjeta.controller');
const autorizacionTrabajador = require("../middleware/autorizacionTrabajador");
const { validarCliente } = require('../middleware/validaciones');
const autorizacionCliente = require('../middleware/autorizacionCliente')

//    /api/Cliente...
router.post('/Create',validarCliente,createCliente);
router.get('/Get',autorizacionTrabajador,getClientes);
router.post('/Tarjeta/Add',autorizacionCliente,createTarjeta);

//    /api/:cliente_celular
router.get('/:cliente_id',autorizacionTrabajador,getCliente);
router.put('/:cliente_id',autorizacionTrabajador,stateCliente);
router.put('/Edit/:cliente_id',autorizacionTrabajador,editCliente);
router.put('/Login/:cliente_celular',loginCliente);

module.exports = router;
