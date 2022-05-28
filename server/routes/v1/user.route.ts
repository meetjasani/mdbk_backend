import { Router } from 'express'
import { UserController } from '../../controllers/user.controller'

const userController = new UserController();


const router = Router();
router.post('/create', userController.createUser)
router.put('/:Id', userController.updateUser)
router.get('/', userController.getAllUser)
router.get('/:Id', userController.getUserById)
router.delete('/:Id', userController.deleteUser)
router.delete('/delete/:Id', userController.deleteAllUsers)

export default router
