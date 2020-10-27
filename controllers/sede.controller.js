const Sede = require('../models/Sede');

async function getSede(req, res) {
    const { sede_id } = req.params;
    try {
        let getSede = await Sede.findOne({

            where: {
                sede_id
            }
        })

        res.json({
            data: getSede
        })

    } catch (error) {
        res.status(500).json({
            message: "Error",
            data: {}
        })
    }

}

async function getSedes(req, res) {

    try {
        const Sedes = await Sede.findAll();
        res.json({
            data: Sedes
        })

    } catch (error) {

    }

}

async function createSede(req, res) {
    const { sede_id, sede_nombre, sede_direccion, sede_ciudad, sede_horario_apertura,sede_horario_cierre } = req.body

    try {
        let newSede = await Sede.create({
            sede_id,
            sede_nombre,
            sede_direccion,
            sede_ciudad,
            sede_horario_apertura,
            sede_horario_cierre
        }, {
            fields: ['sede_id', 'sede_nombre', 'sede_direccion', 'sede_ciudad','sede_horario_apertura','sede_horario_cierre']
        });

        if (newSede) {
            res.json({
                meesage: 'Sede agregada satisfactoriamente',
                data: newSede
            })
        }


    } catch (error) {
        res.status(500).json({
            meesage: 'Error al ingresar la Sede',
            data: {}
        })
            ;

    }



}

async function stateSede(req, res) {
    const { sede_id } = req.params;
    const sedes = await Sede.findAll({
        attributes: ['sede_id', 'sede_estado'],
        where: {
            sede_id
        }
    });
    try {
        if (sedes.length > 0) {
            sedes.forEach(async sede => {
                nuevoestado = sede.sede_estado == 0 ? 1 : 0;
                await sede.update({
                    sede_estado: nuevoestado
                });

            })

            return res.json({
                meesage: 'Sede deshabilitada/habilitada satisfactoriamente',
                data: sedes
            })

        }

    } catch (error) {
        console.log(error);
    }





}

async function editSede(req, res) {
    const { sede_id } = req.params;
    const { sede_nombre, sede_direccion, sede_ciudad, sede_horario_apertura, sede_horario_cierre} = req.body;

    const Sedes = await Sede.findAll({
        attributes: ['sede_id', 'sede_nombre', 'sede_direccion', 'sede_ciudad','sede_horario_apertura','sede_horario_cierre'],

        where: {
            sede_id
        },

    })

    if (Sedes.length > 0) {
        Sedes.forEach(async Sede => {
            await Sede.update({
                sede_nombre,
                sede_direccion,
                sede_ciudad,
                sede_horario_apertura,
                sede_horario_cierre
            });

        })
    }
    return res.json({
        message: 'Datos de la  sede cambiados correctamente',
        data: Sedes
    })

}


exports.createSede = createSede;
exports.getSedes = getSedes;
exports.getSede = getSede;
exports.stateSede = stateSede;
exports.editSede = editSede;