const router = require('express').Router()
const { verify } = require('../middleware/verifyToken');
const ArticleController = require('../controllers/ArticleController')


// Get User Profile
router.get("/", ArticleController.index)
router.get("/:id", ArticleController.getById)

router.post("/", verify, ArticleController.create)
router.put("/:id", verify,  ArticleController.update)

module.exports = router