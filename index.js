const app = require('./app');
const db = require('./config/db');

const port = process.env.PORT || 5000;


//Iniciar Server
app.listen(port, () => {
    console.log(`Server has started on port {port}`);
})


//Conexion BD
db.authenticate()
.then(()=>console.log('Conexión exitosa'))
.catch(err=>console.log('Error: +' + err))




