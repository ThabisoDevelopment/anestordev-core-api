const router = require('express').Router()
const connection = require('../database/connection')
const { verifyUser } = require('../verifyToken');
const { validateUserUpdate } = require("../validation")

// Get User Profile
router.get("/user", verifyUser, (request, response) => {
    const statement = "SELECT * FROM users WHERE id=?"
    connection.execute(statement, [ request.user.id ], (error, results) => {
        if (error) return response.status(500).send("Internal Server Error")
        if (results.length < 1) return response.status(404).send("Sorry! user does not exits")
        const user = {
            id: results[0].id,
            name: results[0].name,
            email: results[0].email,
            img_url: results[0].img_url,
            bio: results[0].bio,
            created_at: results[0].created_at,
            updated_at: results[0].updated_at
        }
        response.send(user)
    })
})

// Update User Profile
router.put("/user", verifyUser, (request, response) => {
    // Validate request body Input | name | bio |
    const { error } = validateUserUpdate(request.body)
    if (error) return response.status(422).send(error.details[0].message)
    // Execute Function To Update Data
    const data = [ request.body.name, request.body.bio, request.user.id ]
    const statement = `UPDATE users SET name=?, bio=? WHERE id=?`
    connection.execute(statement, data, error => {
        if (error) return response.status(500).send("Internal Server Error")
        response.status(202).send("Your Profile Have Been Updated")
    })
})

router.delete("/account/delete", verify, (request, response) => {
    response.send("Account Delete")
})

module.exports = router