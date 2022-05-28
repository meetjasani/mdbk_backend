import { Router } from 'express'
import { MessageController } from '../../controllers/message.controller'

const messageController = new MessageController();

const router = Router();
router.post('/create', messageController.createMessage)
router.get('/memberId', messageController.getMessageByMemberId)
router.put('/:Id', messageController.updateMessage)
router.get('/', messageController.getAllMessage)
router.get('/:Id', messageController.getMessageById)
router.delete('/:Id', messageController.deleteMessage)

export default router
