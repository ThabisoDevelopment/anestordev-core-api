const router = require('express').Router()
const AuthController = require('../controllers/AuthController')
const { verifyPasswordReset } = require('../middleware/verifyToken')

router.post("/login", AuthController.login)
router.post("/register", AuthController.create)
router.post("/password/forgot", AuthController.sendPasswordResetEmail)
router.put("/password/reset", verifyPasswordReset, AuthController.passwordReset)

module.exports = router