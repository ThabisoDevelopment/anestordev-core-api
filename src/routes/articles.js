import express from 'express'
import { publicUser, verify } from '../middleware/verifyToken';
import ArticleController from '../controllers/ArticleController'
import UserActionController from '../controllers/UserActionController';
import CommentController from '../controllers/CommentController';


const router = express.Router()
// Get User Profile
router.get("/", publicUser, ArticleController.index)
router.get("/:id", publicUser, ArticleController.getById)

// create article and update
router.post("/", verify, ArticleController.create)
router.put("/:id", verify,  ArticleController.update)

// Update article settings
router.put("/settings/:id", verify,  ArticleController.settings)

// Like view and comment
router.post("/like/:id", verify, UserActionController.like)
router.post("/view/:id", verify, UserActionController.view)

export default router