const {Router} = require('express')
const router = Router();
const {createSede,getSedes,getSede, stateSede, editSede} = require('../controllers/sede.controller');
const autorizacionTrabajador = require('../middleware/autorizacionTrabajador');


//    /api/Sede...
router.post('/Create',autorizacionTrabajador,createSede);
router.get('/Get',autorizacionTrabajador,getSedes);

//    /api/:Sede_id
router.get('/:sede_id',autorizacionTrabajador,getSede);
router.put('/:sede_id',autorizacionTrabajador,stateSede);
router.put('/Edit/:sede_id',autorizacionTrabajador,editSede);

module.exports = router;