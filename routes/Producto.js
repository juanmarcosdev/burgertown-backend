const {Router} = require('express')
const router = Router();
const {createProducto,getProductos,getProducto, stateProducto, editProducto, getProductosCategoria} = require('../controllers/producto.controller')
const autorizacionCliente = require('../middleware/autorizacionCliente')

//    /api/Producto...
router.post('/Create',createProducto);
router.get('/Get',getProductos);

//    /api/:producto_codigo
router.get('/:producto_codigo',getProducto);
router.put('/:producto_codigo',stateProducto);
router.put('/Edit/:producto_codigo',editProducto);
router.get('/Categoria/:categoria_id',autorizacionCliente,getProductosCategoria)//Productos que pertenecen a una categoria

module.exports = router;