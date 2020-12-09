const sequelize = require('../config/db')
const Producto = require('../models/Producto')
const {Pedido,Productos_Pedido} = require('../models/Pedido')
const Pago = require('../models/Pago')




async function ProductosMasVendidos(req,res){
    const [results] = await sequelize.query('SELECT * FROM Productos_mas_Vendidos');
    res.json({
        data: results,
        message: 'reporte productos mas vendidos'
    })

}
async function ProductosMenosVendidos(req,res){
    const [results] = await sequelize.query('SELECT * FROM Productos_menos_Vendidos');
    res.json({
        data: results,
        message: 'reporte productos menos vendidos'
    })

}

async function MejoresSedes(req,res){
    const [results] = await sequelize.query('SELECT * FROM Sedes_mayores_Ventas');
    res.json({
        data: results,
        message: 'reporte 5 sedes con mayores ventas'
    })

}

async function PeoresSedes(req,res){
    const [results] = await sequelize.query('SELECT * FROM Sedes_menores_Ventas');
    res.json({
        data: results,
        message: 'reporte 5 sedes con menores ventas'
    })

}

async function MejoresClientes(req,res){
    const [results] = await sequelize.query('SELECT * FROM Mejores_Clientes');
    res.json({
        data: results,
        message: 'reporte 5 mejores clientes'
    })

}

async function Proximos_cumpleaneros(req,res){
    const [results] = await sequelize.query('SELECT * FROM Proximos_cumpleaneros()');
    res.json({
        data: results,
        message: 'Clientes que cumplen años el siguiente mes'
    })

}
async function Ventas_producto(req,res){
    const {producto_codigo} = req.params
    const [results] = await sequelize.query('SELECT * FROM Ventas_producto('+ producto_codigo +');');
    res.json({
        data: results,
        message: 'Ventas de este producto'
    })

}

async function Ventas_Fecha(req,res){
    const {fecha_inicial,fecha_final} = req.body;
    const new_fecha_inicial = fecha_inicial.toString();
    const new_fecha_final = fecha_final.toString();
    const [results] = await sequelize.query('SELECT * FROM ventas_fecha(\''+ fecha_inicial + '\',\''+ fecha_final + '\');');
    res.json({
        data: results,
        message: 'Ventas en esta fecha'
    })
 
}

exports.Ventas_Fecha = Ventas_Fecha;
exports.ProductosMasVendidos = ProductosMasVendidos;
exports.ProductosMenosVendidos = ProductosMenosVendidos;
exports.MejoresSedes = MejoresSedes;
exports.PeoresSedes = PeoresSedes;
exports.MejoresClientes = MejoresClientes;
exports.Proximos_cumpleaneros = Proximos_cumpleaneros;
exports.Ventas_producto = Ventas_producto;