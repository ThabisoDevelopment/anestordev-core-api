import express from 'express'
import { verify } from '../middleware/verifyToken';
import ArticleController from '../controllers/ArticleController';
import UtilsController from '../controllers/UtilsController';

const router = express.Router()
// Get User Profile
router.get("/", ArticleController.index)
router.get("/:id", ArticleController.getById)

router.post("/", verify, ArticleController.create)
router.put("/:id", verify,  ArticleController.update)

router.put("/settings/:id", verify,  ArticleController.settings)


router.post("/like/:id", verify, UtilsController.like)
router.post("/view/:id", verify, UtilsController.view)

    
/**
 * Article Controls or Settigns
 * like and unlike action
 * view actions
 * Comment CRUD
 */

export default router