const Sequelize = require('sequelize')
const db = require('../config/db')

const Cliente = db.define("clientes",{
    cliente_id  :{
        type: Sequelize.INTEGER,
        primaryKey:true,

    },

    cliente_celular:{
        type: Sequelize.CHAR,
        

    },
    cliente_nombre:{
        type: Sequelize.CHAR,
        allowNull: false

    },
    cliente_apellido:{
        type: Sequelize.CHAR,
        allowNull: false
    },
    cliente_documento:{
        type: Sequelize.CHAR,
        allowNull: false

    },
    cliente_direccion:{
        type: Sequelize.CHAR,
        allowNull: false

    },
    cliente_fecha_nacimiento:{
        type: Sequelize.DATEONLY,
        allowNull: false

    },
    cliente_password:{
        type: Sequelize.CHAR,
        allowNull: false

    }
},{
    timestamps : false
});

module.exports = Cliente;