import { Router } from 'express'
import { ClientProfileController } from '../../controllers/clientProfile.controller'

const clientProfileController = new ClientProfileController();
const router = Router();

router.get('/', clientProfileController.getAllClients)
router.get('/byMemberId', clientProfileController.getClientProfileByMemberId)
router.get('/:Id', clientProfileController.getClientProfile)
router.post('/generateVerificationCode', clientProfileController.generateSmsVerificationCode)
router.post('/verifyPhone', clientProfileController.verifyPhone)
router.post('/create', clientProfileController.createClientProfile)
router.put('/:Id', clientProfileController.updateClientProfile)

export default router
