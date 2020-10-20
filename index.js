const app = require('./app');
const db = require('./config/db');

const port = process.env.PORT || 3000;


//Iniciar Server
app.listen(port, () => {
    console.log('Server has started on port 5000');
})


//Conexion BD
db.authenticate()
.then(()=>console.log('Conexión exitosa'))
.catch(err=>console.log('Error: +' + err))




