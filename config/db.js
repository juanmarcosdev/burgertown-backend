const Sequelize = require('sequelize');
module.exports  = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
    protocol: 'postgres',
    logging:  true //false
})
