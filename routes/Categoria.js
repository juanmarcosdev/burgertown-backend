const {Router} = require('express')
const router = Router();
const {createCategoria,getCategorias,getCategoria, stateCategoria, editCategoria} = require('../controllers/categoria.controller')


//    /api/Categoria...
router.post('/Create',createCategoria);
router.get('/Get',getCategorias);

//    /api/:Categoria_id
router.get('/:categoria_id',getCategoria);
router.put('/:categoria_id',stateCategoria);
router.put('/Edit/:categoria_id',editCategoria);


module.exports = router;