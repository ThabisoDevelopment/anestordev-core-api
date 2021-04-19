const router = require('express').Router()
const UserController = require('../controllers/UserController');
const { verify } = require('../middleware/verifyToken');

// Get User Profile
router.get("/current", verify, UserController.current)
router.put("/update", verify, UserController.update)

module.exports = router