const bcrypt = require('bcrypt');


async function Encriptar(password) {

    const saltRounds = 10;
    const Salt = await bcrypt.genSalt(saltRounds)
    const bcryptPassword = await bcrypt.hash(password, Salt);


    if(bcryptPassword){
        return bcryptPassword;
        
    }
    else{
        return false;
    }




}

exports.Encriptar = Encriptar;