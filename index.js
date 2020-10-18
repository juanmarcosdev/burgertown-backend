const app = require('./app');
const db = require('./config/db');



//Iniciar Server
app.listen(5000, () => {
    console.log('Server has started on port 5000');
})


//Conexion BD
db.authenticate()
.then(()=>console.log('Conexión exitosa'))
.catch(err=>console.log('Error: +' + err))




