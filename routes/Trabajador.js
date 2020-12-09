const {Router} = require('express')
const router = Router();
const {createTrabajador,getTrabajadores,getTrabajador, stateTrabajador, editTrabajador, loginTrabajador} = require('../controllers/trabajador.controller')
const autorizacionTrabajador = require("../middleware/autorizacionTrabajador");
const { validarTrabajador } = require('../middleware/validaciones');


/*
//    /api/Trabajador...
router.post('/Create',validarTrabajador,createTrabajador);
router.get('/Get',getTrabajadores);

//    /api/:Trabajador_documento
router.get('/:trabajador_id',getTrabajador);
router.put('/:trabajador_id',stateTrabajador);
router.put('/Edit/:trabajador_id',editTrabajador);
router.put('/Login/:trabajador_documento',loginTrabajador);

*/
//    /api/Trabajador...
router.post('/Create',autorizacionTrabajador,validarTrabajador,createTrabajador);
router.get('/Get',autorizacionTrabajador,getTrabajadores);

//    /api/:Trabajador_documento
router.get('/:trabajador_id',autorizacionTrabajador,getTrabajador);
router.put('/:trabajador_id',autorizacionTrabajador,stateTrabajador);
router.put('/Edit/:trabajador_id',autorizacionTrabajador,editTrabajador);
router.put('/Login/:trabajador_documento',loginTrabajador);



module.exports = router;
