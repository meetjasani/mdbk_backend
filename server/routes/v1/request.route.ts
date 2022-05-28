import { Router } from 'express'
import { RequestController } from '../../controllers/request.controller'

const requestController = new RequestController();

const router = Router();
router.post('/create', requestController.createRequest)
router.put('/:Id', requestController.updateRequest)
router.get('/', requestController.getAllRequest)
router.get('/:Id', requestController.getRequestById)

export default router
