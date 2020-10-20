const Sequelize = require('sequelize');
module.exports  = new Sequelize(process.env.DATABASE_URL, {
    dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3],
      logging:  true //false
})
