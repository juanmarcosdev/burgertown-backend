const {Router} = require('express');
const { ProductosMasVendidos, ProductosMenosVendidos, MejoresSedes, PeoresSedes,MejoresClientes, Proximos_cumpleaneros, Ventas_producto, Ventas_Fecha  } = require('../controllers/reportes.controllers');
const router = Router();


router.get('/ProductosMasVendidos',ProductosMasVendidos);
router.get('/ProductosMenosVendidos',ProductosMenosVendidos);
router.get('/MejoresSedes',MejoresSedes)
router.get('/PeoresSedes',PeoresSedes)
router.get('/MejoresClientes',MejoresClientes)
router.get('/Proximos_cumpleaneros',Proximos_cumpleaneros)
router.get('/Ventas_producto/:producto_codigo',Ventas_producto)
router.put('/Ventas_Fecha',Ventas_Fecha);


module.exports = router;