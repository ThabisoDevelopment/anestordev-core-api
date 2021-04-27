import express from 'express'
import { verify } from '../middleware/verifyToken';
import ArticleController from '../controllers/ArticleController';

const router = express.Router()
// Get User Profile
router.get("/", ArticleController.index)
router.get("/:id", ArticleController.getById)

router.post("/", verify, ArticleController.create)
router.put("/:id", verify,  ArticleController.update)

export default router