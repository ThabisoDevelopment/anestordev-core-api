import express from 'express'
import AuthController from '../controllers/AuthController'
import { verifyPasswordReset } from '../middleware/verifyToken'

const router = express.Router()

router.post("/login", AuthController.login)
router.post("/register", AuthController.create)
router.post("/password/forgot", AuthController.sendPasswordResetEmail)
router.put("/password/reset", verifyPasswordReset, AuthController.passwordReset)

export default router