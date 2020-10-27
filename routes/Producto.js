const {Router} = require('express')
const router = Router();
const {createProducto,getProductos,getProducto, stateProducto, editProducto, getProductosCategoria} = require('../controllers/producto.controller')
const autorizacionCliente = require('../middleware/autorizacionCliente');
const autorizacionTrabajador = require('../middleware/autorizacionTrabajador');


//    /api/Producto...
router.post('/Create',autorizacionTrabajador,createProducto);
router.get('/Get',autorizacionTrabajador,getProductos);

//    /api/:producto_codigo
router.get('/:producto_codigo',autorizacionTrabajador,getProducto);
router.put('/:producto_codigo',autorizacionTrabajador,stateProducto);
router.put('/Edit/:producto_codigo',autorizacionTrabajador,editProducto);
router.get('/Categoria/:categoria_id',autorizacionCliente,getProductosCategoria);//Productos que pertenecen a una categoria

module.exports = router;