const {Router} = require('express')
const router = Router();
const {createCategoria,getCategorias,getCategoria, stateCategoria, editCategoria} = require('../controllers/categoria.controller')


//    /api/Categoria...
router.post('/Create',createCategoria);
router.get('/Get',getCategorias);

//    /api/:Categoria_documento
router.get('/:categoria_documento',getCategoria);
router.put('/:categoria_documento',stateCategoria);
router.put('/Edit/:categoria_documento',editCategoria);

module.exports = router;