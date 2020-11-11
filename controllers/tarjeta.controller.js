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


    if(addTarjeta.rows > 0){
        res.json({
            message: 'Tarjeta agregada satisfactoriamente',
            data : addTarjeta
        })
    }
    else{
        res.json({
            message: 'Error, tarjeta ya registrada'
        })
    }
  } catch (error) {
    res.json(error);
  }
}

exports.createTarjeta = createTarjeta;
