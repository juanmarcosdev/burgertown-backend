const Sequelize = require('sequelize')
const db = require('../config/db')

const Categoria = db.define('categorias',{
    categoria_id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
    },

    categoria_nombre:{
        type: Sequelize.CHAR,
        allowNull: false

    },
    categoria_descripcion:{
        type: Sequelize.CHAR,
        allowNull: false
    },

    categoria_estado : {
        type: Sequelize.INTEGER,
        default: 0
    }
    

},{
    timestamps : false
});



module.exports = Categoria;