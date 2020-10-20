const {Router} = require('express')
const router = Router();
const {createTrabajador,getTrabajadores,getTrabajador, stateTrabajador, editTrabajador} = require('../controllers/trabajador.controller')


//    /api/Trabajador...
router.post('/Create',createTrabajador);
router.get('/Get',getTrabajadores);

//    /api/:Trabajador_documento
router.get('/:trabajador_documento',getTrabajador);
router.put('/:trabajador_documento',stateTrabajador);
router.put('/Edit/:trabajador_documento',editTrabajador);

module.exports = router;