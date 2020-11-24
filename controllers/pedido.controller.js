const { Pedido, Productos_Pedido } = require("../models/Pedido");
const Pago = require("../models/Pago");

async function getPedido(req, res) {
  const { pedido_id } = req.params;
  try {
    const pedido = await Pedido.findOne({
      where: {
        pedido_id,
      },
    });

    res.json({
      message: "Pedido encontrado",
      data: pedido,
    });
  } catch (error) {
    res.json({
      message: "No existe un pedido con este id",
    });
    console.log(error);
  }
}

async function getPedidos(req, res) {
  const pedidos = await Pedido.findAll();

  res.json({
    data: pedidos,
  });
}

async function createPedido(req, res) {
  const { sede_id, cliente_id } = req.body;
  try {
    newPedido = await Pedido.create(
      {
        sede_id,
        cliente_id,
      },
      {
        fields: ["sede_id", "cliente_id"],
      }
    );

    if (newPedido) {
      res.json({
        message: "Pedido creado correctamente",
        data: newPedido,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "Error al crear el pedido",
    });
  }
}

async function pagarPedido(req, res) {
  const Pagos = req.body;
  try {
    const newPago = await Pago.bulkCreate(Pagos,{returning: true})

    if(newPago){
      res.json({
        message: 'Pago/s realizado/s exitosamente',
        data: newPago
      })
    }
    

    
  } catch (error) {
    res.json({
      message: 'Error al procesar el/los pago/s',
      error: error
    })
  }
}
async function agregarProductoPedido(req, res) {
  const Productos = req.body;
  try {
    addProductos = await Productos_Pedido.bulkCreate(Productos,{returning: true}
    )
    console.log(Productos);

    if(addProductos){
      res.json({
        message: 'Productos agregados correctamente',
        data: addProductos
      })
    }
    
    
  } catch (error) {
    console.log(error);
    res.json({
      error: error
    })
  }
}

exports.getPedido = getPedido;
exports.getPedidos = getPedidos;
exports.createPedido = createPedido;
exports.pagarPedido = pagarPedido;
exports.agregarProductoPedido = agregarProductoPedido;
