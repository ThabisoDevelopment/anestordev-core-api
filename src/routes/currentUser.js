const router = require('express').Router()
const connection = require('../database/connection');
const { verify } = require('../verifyToken');

// Get User Profile
router.get("/user", verify, (request, response) => {
    const statement = "SELECT * FROM users WHERE id=?"
    connection.execute(statement, [ request.user.id ], (error, results) => {
        if (error) return response.status(500).send("Internal Server Error")
        const user = results[0] || null
        response.send(user)
    })
})

// Update User Profile
router.put("/user", verify, (request, response) => {
    
    response.send({ user: request.user })
})

router.delete("/account/delete", verify, (request, response) => {
    response.send("Account Delete")
})

module.exports = router