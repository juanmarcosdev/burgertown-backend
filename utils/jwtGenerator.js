const jwt = require('jsonwebtoken');
const { llaveCliente, llaveTrabajador } = require('../config/config');



function jwtGeneratorCliente (cliente_celular){
    const payload = {
        Cliente: cliente_celular
    }

    try {
        const token = jwt.sign(payload,llaveCliente,{expiresIn: 60*2})
        return token

    } catch (error) {

        console.log(error);
        
    }
    
    
    

}

function jwtGeneratorTrabajador (trabajador_documento){
    const payload = {
        Trabajador: trabajador_documento
    }

    try {
        const token = jwt.sign(payload,llaveTrabajador,{expiresIn: 60*2})
        return token;
        
    } catch (error) {
        console.log(error);

        
    }
    
}


module.exports = {jwtGeneratorCliente,jwtGeneratorTrabajador};