import { Router } from 'express'
import CommentController from '../controllers/CommentController';
import Token from '../middleware/Token';


const router = Router()
 /**
  *  ID Param is a type_id
  *  GET requires query type=article || type=question
  *  POST requires body type AND comment 
  *  DELETE req ID is a comment original id
  */
router.get("/:id", CommentController.all)
router.post("/:id", Token.authenticated, CommentController.comment)
router.delete("/:id", Token.authenticated, CommentController.destroyComment) /** ID is Comment ID */


// router.post("/comments/reply/:id", verify, C.comment)
// router.delete("/comments/reply/:id", verify, UtilsController.destroyComment)

export default router