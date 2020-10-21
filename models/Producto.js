const Sequelize = require('sequelize')
const db = require('../config/db')

const Producto = db.define("productos",{
    producto_codigo  :{
        type: Sequelize.INTEGER,
        primaryKey:true,

    },

    producto_nombre:{
        type: Sequelize.CHAR,
        allowNull: false

    },
    producto_descripcion:{
        type: Sequelize.CHAR,
        allowNull: false

    },
    producto_imagen:{
        type: Sequelize.CHAR,
        allowNull: false
    },
    producto_existencias:{
        type: Sequelize.INTEGER,
        

    },
    producto_precio:{
        type: Sequelize.INTEGER,
        

    },
    producto_descuento:{
        type: Sequelize.INTEGER,
        

    },
    producto_iva:{
        type: Sequelize.INTEGER,
        

    },
    producto_estado : {
        type: Sequelize.INTEGER,
        default: 0
    },
    categoria_id:{
        type: Sequelize.INTEGER,
        allowNull: false

    },
},

{
    timestamps : false
});

module.exports = Producto;