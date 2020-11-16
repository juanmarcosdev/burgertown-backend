const {Router} = require('express');
const router = Router();
const autorizacionTrabajador = require("../middleware/autorizacionTrabajador");
const autorizacionCliente = require("../middleware/autorizacionCliente");
const { createPedido, pagarPedido } = require('../controllers/pedido.controller');

//    /api/Pedido..
router.post('/Create',autorizacionCliente,createPedido);
router.post('/Pagar',autorizacionCliente,pagarPedido);


module.exports = router;
