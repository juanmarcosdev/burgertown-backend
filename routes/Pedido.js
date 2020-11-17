const {Router} = require('express');
const router = Router();
const autorizacionTrabajador = require("../middleware/autorizacionTrabajador");
const autorizacionCliente = require("../middleware/autorizacionCliente");
const { createPedido, pagarPedido, agregarProductoPedido } = require('../controllers/pedido.controller');

//    /api/Pedido..
router.post('/Create',autorizacionCliente,createPedido);
router.post('/Pagar',autorizacionCliente,pagarPedido);
router.put('/AgregarProducto/:pedido_id',autorizacionCliente,agregarProductoPedido);

module.exports = router;
