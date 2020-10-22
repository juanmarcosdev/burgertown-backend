const {Router} = require('express')
const router = Router();
const {createCliente,getClientes,getCliente, stateCliente, editCliente} = require('../controllers/cliente.controller')


//    /api/Cliente...
router.post('/Create',createCliente);
router.get('/Get',getClientes);

//    /api/:cliente_celular
router.get('/:cliente_celular',getCliente);
router.put('/:cliente_id',stateCliente);
router.put('/Edit/:cliente_celular',editCliente);

module.exports = router;