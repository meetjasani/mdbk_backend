import { Router } from 'express'
import { SearchOptionController } from '../../controllers/searchOption.controller'

const searchOptionController = new SearchOptionController();

const router = Router();
router.post('/create', searchOptionController.createSearchOption)
router.put('/:Id', searchOptionController.updateSearchOption)

export default router

