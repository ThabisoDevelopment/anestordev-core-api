import { Router } from 'express'
import UserController from '../controllers/UserController'
import { verify } from '../middleware/verifyToken'

const router = Router()

// Get User Profile
router.get("/current", verify, UserController.current)
router.put("/update", verify, UserController.update)




export default router