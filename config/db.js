const Sequelize = require('sequelize');
if(process.env.DATABASE_URL) {
    module.exports  = new Sequelize(process.env.DATABASE_URL, {
        dialect:  'postgres',
        dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false // <<<<<<< YOU NEED THIS
            }
          },
        protocol: 'postgres',
        logging:  true
    })
} else {
    module.exports  = new Sequelize('ds2','postgres','11111',{
        host:'localhost',
        dialect:'postgres',
        dialectOptions: {
            ssl: {
              require: true,
              rejectUnauthorized: false // <<<<<<< YOU NEED THIS
            }
          },
    })
}
