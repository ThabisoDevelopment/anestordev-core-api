import { Router } from 'express'
import AuthController from '../controllers/AuthController'
import Token from '../middleware/Token'

const router = Router()

router.post("/login", AuthController.login)
router.post("/register", AuthController.create)
router.post("/password/forgot", AuthController.sendPasswordResetEmail)
router.put("/password/reset", Token.verifyPasswordReset, AuthController.passwordReset)

export default router