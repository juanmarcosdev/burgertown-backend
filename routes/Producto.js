const {Router} = require('express')
const router = Router();
const {createProducto,getProductos,getProducto, stateProducto, editProducto, getProductosCategoria, getMenu} = require('../controllers/producto.controller')
const autorizacionCliente = require('../middleware/autorizacionCliente');
const autorizacionTrabajador = require('../middleware/autorizacionTrabajador');

/*
//    /api/Producto...
router.post('/Create',createProducto);
router.get('/Get',getProductos);

//    /api/:producto_codigo
router.get('/:producto_codigo',getProducto);
router.put('/:producto_codigo',stateProducto);
router.put('/Edit/:producto_codigo',editProducto);
router.get('/Categoria/:categoria_id',getProductosCategoria);//Productos que pertenecen a una categoria
router.get('/Menu/Get',getMenu);//Menu de productos


*/
//    /api/Producto...
router.post('/Create',autorizacionTrabajador,createProducto);
router.get('/Get',getProductos);

//    /api/:producto_codigo
router.get('/:producto_codigo',getProducto);
router.put('/:producto_codigo',autorizacionTrabajador,stateProducto);
router.put('/Edit/:producto_codigo',autorizacionTrabajador,editProducto);
router.get('/Categoria/:categoria_id',autorizacionCliente,getProductosCategoria);//Productos que pertenecen a una categoria
router.get('/Menu/Get',getMenu);//Menu de productos


module.exports = router;