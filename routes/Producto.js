const {Router} = require('express')
const router = Router();
const {createProducto,getProductos,getProducto, stateProducto, editProducto} = require('../controllers/producto.controller')


//    /api/Cliente...
router.post('/Create',createProducto);
router.get('/Get',getProductos);

//    /api/:producto_codigo'/:cliente_celular',getProducto);
router.put('/:producto_codigo',stateProducto);
router.put('/Edit/:producto_codigo',editProducto);

module.exports = router;