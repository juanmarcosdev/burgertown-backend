const Sequelize = require('sequelize')
const db = require('../config/db')

const Sede= db.define('sedes',{
    sede_id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
    },

    sede_nombre:{
        type: Sequelize.CHAR,
        allowNull: false

    },
    sede_direccion:{
        type: Sequelize.CHAR,
        allowNull: false
    },

    sede_ciudad:{
        type: Sequelize.CHAR,
        allowNull: false
    },

    sede_horario_apertura:{
        type: Sequelize.TIME,
       
    },

    sede_horario_cierre:{
        type: Sequelize.TIME,  
    },

    sede_estado : {
        type: Sequelize.INTEGER,
        default: 0
    }
    

},{
    timestamps : false
});



module.exports = Sede;