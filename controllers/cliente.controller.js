const Cliente = require('../models/Cliente');

async function getCliente(req, res) {
    const { cliente_celular } = req.params
    console.log(cliente_celular);
    try {
        let getCliente = await Cliente.findOne({

            where: {
                cliente_celular:cliente_celular
            }
        })
        
        res.json({
            data: getCliente
        })

    } catch (error) {
        res.status(500).json({
            message: "Error",
            data: {}
        })
    }

}

async function getClientes(req, res) {

    try {
        const Clientes = await Cliente.findAll();
        res.json({
            data: Clientes
        })

    } catch (error) {

    }

}

async function createCliente(req, res) {
    //console.log(req.body);
    const { cliente_celular, cliente_nombre, cliente_apellido, cliente_documento, cliente_direccion, cliente_fecha_nacimiento, cliente_password } = req.body

    try {
        let newCliente = await Cliente.create({
            cliente_celular,
            cliente_nombre,
            cliente_apellido,
            cliente_documento,
            cliente_direccion,
            cliente_fecha_nacimiento,
            cliente_password
        }, {
            fields: ['cliente_celular', 'cliente_nombre', 'cliente_apellido', 'cliente_documento', 'cliente_direccion', 'cliente_fecha_nacimiento', 'cliente_password']
        });

        if (newCliente) {
            res.json({
                meesage: 'Cliente agregado satisfactoriamente',
                data: newCliente
            })
        }


    } catch (error) {
        res.status(500).json({
            meesage: 'Error al ingresar el cliente',
            data: {}
        })
            ;

    }



}

async function deleteCliente(req,res){
    try {
        const {cliente_celular} = req.params;
        let deleteRowCount = await Cliente.destroy({
            where:{
                cliente_celular
            }
        })
        res.json({
            message: 'Cliente eliminado satisfactoriamente',
            count : deleteRowCount
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:'Error al eliminar este cliente'
        })
    }
}

exports.createCliente = createCliente;
exports.getClientes = getClientes;
exports.getCliente = getCliente;
exports.deleteCliente = deleteCliente;