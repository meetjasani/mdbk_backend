import { Router } from 'express'
import { SideCharacterProfileController } from '../../controllers/sideCharacter.controller'

const sideCharacterProfileController = new SideCharacterProfileController();

const router = Router();
router.post('/create', sideCharacterProfileController.createSideCharacterProfile)
router.get('/byMemberId', sideCharacterProfileController.getSideCharacterByMemberId)
router.get('/:profession', sideCharacterProfileController.getSideCharacterByProfession)
router.put('/:Id', sideCharacterProfileController.updateSideCharacterProfile)

export default router
