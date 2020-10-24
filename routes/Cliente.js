const {Router} = require('express')
const router = Router();
const {createCliente,getClientes,getCliente, stateCliente, editCliente, loginCliente} = require('../controllers/cliente.controller')
const autorizacionCliente = require("../middleware/autorizacionCliente");

//    /api/Cliente...
router.post('/Create',createCliente);
router.get('/Get',getClientes);

//    /api/:cliente_celular
router.get('/:cliente_id',getCliente);
router.put('/:cliente_id',stateCliente);
router.put('/Edit/:cliente_id',editCliente);
router.get('/Login/:cliente_celular',loginCliente);

module.exports = router;