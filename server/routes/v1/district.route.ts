import { Router } from 'express'
import { DistrictController } from '../../controllers/district.controller'

const districtController = new DistrictController();


const router = Router();
router.post('/create', districtController.createDistrict)
router.get('/alldistrict/:Id', districtController.getDistrictByProvinceId)
router.put('/:Id', districtController.updateDistrict)
router.get('/', districtController.getAllDistrict)
router.get('/:Id', districtController.getDistrictById)

export default router