const Tarjeta = require("../models/Tarjeta");

async function createTarjeta(req, res) {
  const {
    tarjeta_numero,
    tarjeta_cvc,
    tarjeta_vencimiento,
    tarjeta_tipo,
    cliente_id,
  } = req.body;

  try {
    const addTarjeta = Tarjeta.create(
      {
        tarjeta_numero,
        tarjeta_cvc,
        tarjeta_vencimiento,
        tarjeta_tipo,
        cliente_id,
      },
      {
        fields: [
          "tarjeta_numero",
          "tarjeta_cvc",
          "tarjeta_vencimiento",
          "tarjeta_tipo",
          "cliente_id",
        ],
      }
    );

    res.json({
      message: "Tarjeta agregada satisfactoriamente",
      data: addTarjeta,
    });
  } catch (error) {
    res.json(error);
  }
}

async function getTarjetasCliente(req,res) {
  console.log('hola');
  const {cliente_id} = req.params;
  try {
    const metodos = await Tarjeta.findAll({
      where: {
        cliente_id,
      },
    });
    if (metodos) {
      res.json({
        message: "metodos de pago para este cliente: ",
        data: metodos,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      error,
    });
  }
}


exports.getTarjetasCliente = getTarjetasCliente;
exports.createTarjeta = createTarjeta;