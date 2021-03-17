const router = require('express').Router()
const connection = require('../database/connection');
const bcrypt = require("bcryptjs")
const { validateLogin } = require('../validation');
const jwt = require('jsonwebtoken');

// Route login to application
module.exports = router.post("/login", (request, response) => {
    // Login Validation request body | email | password |
    const { error } = validateLogin(request.body)
    if (error) return response.status(422).send(error.details[0].message)

    const statement = `SELECT id, email, password FROM users WHERE email=?`
    connection.execute(statement, [ request.body.email ], async(error, results) => {
        if (error) return response.status(500).send("Internal Server Error")
        if (results.length < 1) return response.status(422).send("Email or password is invalid - email")

        // validate password
        const user = results[0]
        const validPass = await bcrypt.compare(request.body.password, user.password)
        if(!validPass) return response.status(422).send("Email or password in invalid - password")
        
        // Create and Assign Token
        // const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: '30s'})
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET)
        response.header('authorization', token).send(token)
    })
})