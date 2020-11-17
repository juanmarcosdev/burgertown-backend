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

const Productos_Pedido = db.define("pedido_contiene_productos",{
    pedido_id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    producto_codigo:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    pedido_cp_cantidad:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    pedido_cp_precio:{
        type: Sequelize.FLOAT
    }


},{
    timestamps: false
})

exports.Pedido = Pedido;
exports.Productos_Pedido = Productos_Pedido;
