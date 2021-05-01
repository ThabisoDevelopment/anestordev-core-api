import { Router } from 'express'
import UserController from '../controllers/UserController'
import { verify } from '../middleware/verifyToken'
import UtilsController from '../controllers/UtilsController'

const router = Router()

// Get User Profile
router.get("/current", verify, UserController.current)
router.put("/update", verify, UserController.update)

router.post("/likes/:id", verify, UtilsController.like)
router.post("/views/:id", verify, UtilsController.view)
router.post("/comments/:id", verify, UtilsController.comment)
router.delete("/comments/:id", verify, UtilsController.destroyComment)

// router.post("/comments/reply/:id", verify, UtilsController.comment)
// router.delete("/comments/reply/:id", verify, UtilsController.destroyComment)


export default router