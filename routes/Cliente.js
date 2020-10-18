const {Router} = require('express')
const router = Router();
const {createCliente,getClientes,getCliente, deleteCliente} = require('../controllers/cliente.controller')


//    /api/Cliente...
router.post('/Create',createCliente);
router.get('/Get',getClientes);

//    /api/:cliente_celular
router.get('/:cliente_celular',getCliente)
router.delete('/:cliente_celular',deleteCliente)

module.exports = router;