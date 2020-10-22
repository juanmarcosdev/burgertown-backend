const {Router} = require('express')
const router = Router();
const {createTrabajador,getTrabajadores,getTrabajador, stateTrabajador, editTrabajador} = require('../controllers/trabajador.controller')


//    /api/Trabajador...
router.post('/Create',createTrabajador);
router.get('/Get',getTrabajadores);

//    /api/:Trabajador_documento
router.get('/:trabajador_id',getTrabajador);
router.put('/:trabajador_id',stateTrabajador);
router.put('/Edit/:trabajador_id',editTrabajador);

module.exports = router;