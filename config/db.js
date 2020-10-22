const Sequelize = require('sequelize');
if(process.env.DATABASE_URL) {
    module.exports  = new Sequelize(process.env.DATABASE_URL, {
        dialect:  'postgres',
        protocol: 'postgres',
        logging:  true
    })
} else {
    module.exports  = new Sequelize('ds2','postgres','11111',{
        host:'localhost',
        dialect:'postgres',
    })
}
