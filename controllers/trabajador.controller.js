const Trabajador = require('../models/Trabajador');
const Encriptacion = require('../middleware/Encriptacion')

async function getTrabajador(req, res) {
    const { trabajador_id } = req.params;
    try {
        let getTrabajador = await Trabajador.findOne({

            where: {
                trabajador_id
            }
        })

        res.json({
            data: getTrabajador
        })

    } catch (error) {
        res.status(500).json({
            message: "Error",
            data: {}
        })
    }

}

async function getTrabajadores(req, res) {

    try {
        const Trabajadores = await Trabajador.findAll();
        res.json({
            data: Trabajadores
        })

    } catch (error) {

    }

}

async function createTrabajador(req, res) {
    const { trabajador_documento, trabajador_nombre, trabajador_apellido, trabajador_celular, trabajador_foto, trabajador_contratacion, trabajador_cargo, trabajador_direccion, trabajador_password } = req.body
    const bcryptPassword = await Encriptacion.Encriptar(trabajador_password);
    try {
        let newTrabajador = await Trabajador.create({
            trabajador_documento,
            trabajador_nombre,
            trabajador_apellido,
            trabajador_celular,
            trabajador_foto,
            trabajador_contratacion,
            trabajador_cargo,
            trabajador_direccion,
            trabajador_password: bcryptPassword
        }, {
            fields: ['trabajador_documento', 'trabajador_nombre', 'trabajador_apellido', 'trabajador_celular', 'trabajador_foto', 'trabajador_contratacion', 'trabajador_cargo', 'trabajador_direccion', 'trabajador_password']
        });

        if (newTrabajador) {
            res.json({
                meesage: 'Trabajador agregado satisfactoriamente',
                data: newTrabajador
            })
        }


    } catch (error) {
        res.status(500).json({
            meesage: 'Error al ingresar el Trabajador',
            data: {}
        })
            ;

    }



}

async function stateTrabajador(req, res) {
    const { trabajador_id } = req.params;
    const trabajadores = await Trabajador.findAll({
        attributes: ['trabajador_id', 'trabajador_estado'],
        where: {
            trabajador_id
        }
    });
    try {
        if (trabajadores.length > 0) {
            trabajadores.forEach(async trabajador => {
                nuevoestado = trabajador.trabajador_estado == 0 ? 1 : 0;
                await trabajador.update({
                    trabajador_estado: nuevoestado
                });

            })

            return res.json({
                meesage: 'Trabajador deshabilitado/habilitado satisfactoriamente',
                data: trabajadores
            })

        }

    } catch (error) {
        console.log(error);
    }





}

async function editTrabajador(req, res) {
    const { trabajador_id } = req.params;
    const { trabajador_nombre, trabajador_apellido, trabajador_celular, trabajador_foto, trabajador_contratacion, trabajador_cargo, trabajador_direccion, trabajador_password } = req.body;

    const Trabajadores = await Trabajador.findAll({
        attributes: ['trabajador_id', 'trabajador_nombre', 'trabajador_apellido', 'trabajador_celular', 'trabajador_foto', 'trabajador_contratacion', 'trabajador_cargo', 'trabajador_direccion', 'trabajador_password'],

        where: {
            trabajador_id
        },

    })

    if (Trabajadores.length > 0) {
        Trabajadores.forEach(async Trabajador => {
            await Trabajador.update({
                trabajador_nombre,
                trabajador_apellido,
                trabajador_celular,
                trabajador_foto,
                trabajador_contratacion,
                trabajador_cargo,
                trabajador_direccion,
                trabajador_password
            });

        })
    }
    return res.json({
        message: 'Datos del trabajador cambiados correctamente',
        data: Trabajadores
    })

}


exports.createTrabajador = createTrabajador;
exports.getTrabajadores = getTrabajadores;
exports.getTrabajador = getTrabajador;
exports.stateTrabajador = stateTrabajador;
exports.editTrabajador = editTrabajador;