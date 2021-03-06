const Categoria = require('../models/Categoria');

async function getCategoria(req, res) {
    const { categoria_id } = req.params;
    try {
        let getCategoria = await Categoria.findOne({

            where: {
                categoria_id
            }
        })

        res.json({
            data: getCategoria
        })

    } catch (error) {
        res.status(500).json({
            message: "Error",
            data: {}
        })
    }

}

async function getCategorias(req, res) {

    try {
        const Categorias = await Categoria.findAll();
        res.json({
            data: Categorias,
            user: req.user
        })

    } catch (error) {

    }

}

async function createCategoria(req, res) {
    const { categoria_id, categoria_nombre, categoria_descripcion } = req.body

    try {
        let newCategoria = await Categoria.create({
            categoria_id,
            categoria_nombre,
            categoria_descripcion
        }, {
            fields: ['categoria_id', 'categoria_nombre', 'categoria_descripcion']
        });

        if (newCategoria) {
            res.json({
                meesage: 'Categoria agregada satisfactoriamente',
                data: newCategoria
            })
        }


    } catch (error) {
        res.status(500).json({
            meesage: 'Error al ingresar la Categoria',
            data: {}
        })
            ;

    }



}

async function stateCategoria(req, res) {
    const { categoria_id } = req.params;
    const categorias = await Categoria.findAll({
        attributes: ['categoria_id', 'categoria_estado'],
        where: {
            categoria_id
        }
    });
    try {
        if (categorias.length > 0) {
            categorias.forEach(async categoria => {
                nuevoestado = categoria.categoria_estado == 0 ? 1 : 0;
                await categoria.update({
                    categoria_estado: nuevoestado
                });

            })

            return res.json({
                meesage: 'Categoria deshabilitada/habilitada satisfactoriamente',
                data: categorias
            })

        }

    } catch (error) {
        console.log(error);
    }





}

async function editCategoria(req, res) {
    const { categoria_id } = req.params;
    const { categoria_nombre, categoria_descripcion} = req.body;

    const Categorias = await Categoria.findAll({
        attributes: ['categoria_id', 'categoria_nombre', 'categoria_descripcion'],

        where: {
            categoria_id
        },

    })

    if (Categorias.length > 0) {
        Categorias.forEach(async Categoria => {
            await Categoria.update({
                categoria_nombre,
                categoria_descripcion
            });

        })
    }
    return res.json({
        message: 'Datos de la  categoria cambiados correctamente',
        data: Categorias
    })

}

async function getCategoriasCliente(req, res){
    try {
        const categorias = await Categoria.findAll({
            attributes:['categoria_id','categoria_nombre','categoria_estado','categoria_descripcion']
        })
        return res.json({
            data : categorias
        })
        
    } catch (error) {
        return res.json({
            message: 'Error al obtener la informacion de las categorias'
        })
    }
}

exports.createCategoria = createCategoria;
exports.getCategorias = getCategorias;
exports.getCategoriasCliente = getCategoriasCliente;
exports.getCategoria = getCategoria;
exports.stateCategoria = stateCategoria;
exports.editCategoria = editCategoria;
