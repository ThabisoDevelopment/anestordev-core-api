import { Router } from 'express'
import UserController from '../controllers/UserController'
import Token from '../middleware/Token'

const router = Router()

// Get User Profile
router.get("/current", Token.authenticated, UserController.current)
router.put("/update", Token.authenticated, UserController.update)




export default router