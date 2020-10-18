const Sequelize = require('sequelize')
const db = require('../config/db')

const Trabajador = db.define('Trabajador',{
    trabajador_documento:{
        type: Sequelize.CHAR,
        primaryKey:true,
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
    
    

},{
    timestamps : false
});


Sede.hasMany(Trabajador,{foreingKey: 'sede_id'})


Trabajador.belongsTo(Sede,{
    foreignKey: 'sede_id'

})



module.exports = Trabajador;