const jwt = require('jsonwebtoken');
const { llaveCliente, llaveTrabajador } = require('../config/config');



async function jwtGeneratorCliente (cliente_celular){
    const payload = {
        Cliente: cliente_celular
    }

    try {
        const token = jwt.sign(payload,llaveCliente,{expiresIn: 60*60})
        return token


    } catch (error) {

        console.log(error);
        
    }
    
    
    

}

async function jwtGeneratorTrabajador (trabajador_documento){
    const payload = {
        Trabajador: trabajador_documento
    }

    try {
        let token = await jwt.sign(payload,llaveTrabajador,{expiresIn: 60*60})
        return token;
        
    } catch (error) {
        console.log(error);

        
    }
    
}


module.exports = {jwtGeneratorCliente,jwtGeneratorTrabajador};
