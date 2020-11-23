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
  const {
    pago_metodo,
    pago_porcentaje_pedido,
    pago_cuotas,
    pago_fecha,
    tarjeta_id,
    pedido_id,
  } = req.body;

  try {
    const newPagoPedido = Pago.create(
      {
        pago_metodo,
        pago_porcentaje_pedido,
        pago_cuotas,
        pago_fecha,
        tarjeta_id,
        pedido_id,
      },
      {
        fields: [
          "pago_metodo",
          "pago_porcentaje_pedido",
          "pago_cuotas",
          "pago_fecha",
          "tarjeta_id",
          "pedido_id",
        ],
      }
    );

    if (newPagoPedido) {
      res.json({
        message: "Pago realizado exitosamente",
        data: newPagoPedido,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "Error al concretar el pago",
    });
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
