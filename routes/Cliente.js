const {Router} = require('express')
const router = Router();
const {createCliente,getClientes,getCliente, stateCliente, editCliente, loginCliente} = require('../controllers/cliente.controller')
const autorizacionTrabajador = require("../middleware/autorizacionTrabajador");

//    /api/Cliente...
router.post('/Create',createCliente);
router.get('/Get',autorizacionTrabajador,getClientes);

//    /api/:cliente_celular
router.get('/:cliente_id',autorizacionTrabajador,getCliente);
router.put('/:cliente_id',autorizacionTrabajador,stateCliente);
router.put('/Edit/:cliente_id',autorizacionTrabajador,editCliente);
router.get('/Login/:cliente_celular',loginCliente);

module.exports = router;