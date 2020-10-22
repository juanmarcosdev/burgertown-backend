const {Router} = require('express')
const router = Router();
const {createSede,getSedes,getSede, stateSede, editSede} = require('../controllers/sede.controller')


//    /api/Sede...
router.post('/Create',createSede);
router.get('/Get',getSedes);

//    /api/:Sede_id
router.get('/:sede_id',getSede);
router.put('/:sede_id',stateSede);
router.put('/Edit/:sede_id',editSede);

module.exports = router;