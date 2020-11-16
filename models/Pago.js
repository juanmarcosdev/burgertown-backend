const Sequelize = require("sequelize");
const db = require("../config/db");

const Pago = db.define(
    "pagos",
    {
      pago_numero_transaccion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      pago_valor: {
        type: Sequelize.FLOAT,
      },
      pago_metodo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pago_fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      tarjeta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pedido_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  
  module.exports = Pago;