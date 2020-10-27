const {Router} = require('express')
const router = Router();
const {createCategoria,getCategorias,getCategoria, stateCategoria, editCategoria, getCategoriasCliente} = require('../controllers/categoria.controller');
const autorizacionCliente = require('../middleware/autorizacionCliente');
const autorizacionTrabajador = require('../middleware/autorizacionTrabajador');


//    /api/Categoria...
router.post('/Create',autorizacionTrabajador,createCategoria);
router.get('/Get',autorizacionTrabajador,getCategorias);

//    /api/:Categoria_id
router.get('/:categoria_id',autorizacionTrabajador,getCategoria);
router.put('/:categoria_id',autorizacionTrabajador,stateCategoria);
router.put('/Edit/:categoria_id',autorizacionTrabajador,editCategoria);
router.get('/Get/Cliente',autorizacionCliente,getCategoriasCliente);

module.exports = router;