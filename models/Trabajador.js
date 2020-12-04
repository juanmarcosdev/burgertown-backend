const Sequelize = require('sequelize')
const db = require('../config/db')

const Trabajador = db.define('trabajadores',{
    trabajador_id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
    },

    trabajador_documento:{
        type: Sequelize.CHAR,
        allowNull: false

    },
    trabajador_nombre:{
        type: Sequelize.CHAR,
        allowNull: false

    },
    trabajador_apellido:{
        type: Sequelize.CHAR,
        allowNull: false
    },
    trabajador_celular:{
        type: Sequelize.CHAR,
        allowNull: false

    },
    trabajador_foto:{
        type: Sequelize.CHAR,
        allowNull: false

    },
    trabajador_contratacion:{
        type: Sequelize.DATEONLY

    },
    trabajador_cargo:{
        type: Sequelize.CHAR,
        allowNull: false

    },
    trabajador_direccion:{
        type: Sequelize.CHAR,
        allowNull: false

    },
    trabajador_password:{
        type: Sequelize.CHAR,
        allowNull: false

    },
    trabajador_estado : {
        type: Sequelize.INTEGER,
        default: 1
    },

    sede_id : {
        type : Sequelize.INTEGER,
        allowNull: false
    }
    

},{
    timestamps : false
});


/*Sede.hasMany(Trabajador,{foreingKey: 'sede_id'})


Trabajador.belongsTo(Sede,{
    foreignKey: 'sede_id'

})
*/


module.exports = Trabajador;