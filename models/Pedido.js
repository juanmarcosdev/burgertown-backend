const Sequelize = require("sequelize");
const db = require("../config/db");

const Pedido = db.define(
  "pedidos",
  {
    pedido_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    pedido_estado: {
      type: Sequelize.INTEGER,
      default: 0,
    },
    pedido_costo: {
      type: Sequelize.FLOAT,
      default: 0,
    },
    sede_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cliente_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },

  {
    timestamps: false,
  }
);


module.exports = Pedido;
