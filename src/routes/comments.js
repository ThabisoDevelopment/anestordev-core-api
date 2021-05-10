import express from 'express'
import { verify } from '../middleware/verifyToken';
import CommentController from '../controllers/CommentController';


const router = express.Router()
 /**
  *  ID Param is a type_id
  *  GET requires query type=article || type=question
  *  POST requires body type AND comment 
  *  DELETE req ID is a comment original id
  */
router.get("/:id", CommentController.all)
router.post("/:id", verify, CommentController.comment)
router.delete("/:id", verify, CommentController.destroyComment) /** ID is Comment ID */


// router.post("/comments/reply/:id", verify, C.comment)
// router.delete("/comments/reply/:id", verify, UtilsController.destroyComment)

export default router