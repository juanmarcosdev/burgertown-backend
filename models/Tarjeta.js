const Sequelize = require('sequelize')
const db = require('../config/db')
const Cliente = require('./Cliente')

const Tarjeta = db.define("tarjetas",{
    tarjeta_id  :{
        type: Sequelize.INTEGER,
        primaryKey:true,

    },
    tarjeta_cvc:{
        type: Sequelize.CHAR,
        allowNull: false

    },
    tarjeta_tipo:{
        type: Sequelize.INTEGER,
        allowNull: false

    },
    tarjeta_vencimiento:{
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    tarjeta_numero:{
        type: Sequelize.CHAR,
        unique: true,
        allowNull: false
    },
    tarjeta_estado:{
        type: Sequelize.INTEGER,
        default: 1
    },
    cliente_id:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
},

{
    timestamps : false
});

module.exports = Tarjeta;