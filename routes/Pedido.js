const {Router} = require('express');
const router = Router();
const autorizacionTrabajador = require("../middleware/autorizacionTrabajador");
const autorizacionCliente = require("../middleware/autorizacionCliente");
const { createPedido, pagarPedido, agregarProductoPedido } = require('../controllers/pedido.controller');


/*
//    /api/Pedido..
router.post('/Create',createPedido);
router.post('/Pagar',pagarPedido);
router.post('/AgregarProducto',agregarProductoPedido);

*/

//    /api/Pedido..
router.post('/Create',autorizacionCliente,createPedido);
router.post('/Pagar',autorizacionCliente,pagarPedido);
router.post('/AgregarProducto/:pedido_id',autorizacionCliente,agregarProductoPedido);


module.exports = router;
