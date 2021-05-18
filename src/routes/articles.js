import { Router } from 'express'
import ArticleController from '../controllers/ArticleController'
import UserActionController from '../controllers/UserActionController';
import Token from '../middleware/Token';

const router = Router()

// Get User Profile
router.get("/", ArticleController.index)
router.get("/:id", ArticleController.getById)

// create article and update
router.post("/", Token.authenticated, ArticleController.create)
router.put("/:id", Token.authenticated,  ArticleController.update)

// Update article settings
router.put("/settings/:id", Token.authenticated,  ArticleController.settings)

// Like view and comment
router.post("/like/:id", Token.authenticated, UserActionController.like)
router.post("/view/:id", Token.authenticated, UserActionController.view)

export default router