const {Router} = require('express')
const router = Router();
const {createSede,getSedes,getSede, stateSede, editSede} = require('../controllers/sede.controller');
const autorizacionTrabajador = require('../middleware/autorizacionTrabajador');
const { validarTrabajador } = require('../middleware/validaciones');


/*
//    /api/Sede...
router.post('/Create',createSede);
router.get('/Get',getSedes);

//    /api/:Sede_id
router.get('/:sede_id',getSede);
router.put('/:sede_id',stateSede);
router.put('/Edit/:sede_id',editSede);
*/

//    /api/Sede...
router.post('/Create',autorizacionTrabajador,createSede);
router.get('/Get',autorizacionTrabajador,getSedes);

//    /api/:Sede_id
router.get('/:sede_id',autorizacionTrabajador,getSede);
router.put('/:sede_id',autorizacionTrabajador,stateSede);
router.put('/Edit/:sede_id',autorizacionTrabajador,editSede);


module.exports = router;