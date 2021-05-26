import { Router } from 'express'
import FileController from '../controllers/FileController'
import Token from '../middleware/Token'

const router = Router()

// Get User Profile
router.post("/upload", Token.authenticated, FileController.uploadImage)



export default router