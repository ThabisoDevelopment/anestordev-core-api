const router = require('express').Router()
const connection = require('../database/connection');
const { verify } = require('../verifyToken');

// Get User Profile
router.get("/user", verify, (request, response) => {
    
    response.send({ user: request.user })
})

// Update User Profile
router.put("/user", verify, (request, response) => {
    
    response.send({ user: request.user })
})

module.exports = router