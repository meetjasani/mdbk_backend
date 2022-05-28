import { Router } from 'express'
import { ProvinceController } from '../../controllers/province.controller'

const provinceController = new ProvinceController();

const router = Router();
router.post('/create', provinceController.createProvince)
router.put('/:Id', provinceController.updateProvince)
router.get('/', provinceController.getAllProvince)
router.get('/:Id', provinceController.getProvinceById)

export default router