import { Router } from 'express'
import Token from '../middleware/Token'
import Upload from '../middleware/filesUpload'

const router = Router()

// Get User Profile
router.post("/upload", Token.authenticated, Upload.single('image'), (request, response) => {
    const file = request.file
    response.send({ success: 1, file })
})

router.get("/:id", (request, response) => {
    response.send("image")
})



export default router