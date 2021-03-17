const router = require('express').Router()
const connection = require('../database/connection');
const bcrypt = require("bcryptjs")
const { validateRegistration } = require('../validation');

// Route Register new user
module.exports = router.post("/register", (request, response) => {
    // Validate request body Input | name | email | password |
    const { error } = validateRegistration(request.body)
    if (error) return response.status(422).send(error.details[0].message)

    // Check if email Exits
    const statement = `SELECT * FROM users WHERE email=?`
    connection.execute(statement, [ request.body.email ], async(error, results) => {
        if (error) return response.status(500).send("Internal Server Error")
        if (results.length > 0) return response.status(422).send("Sorry email already exists")

        // Generate a Hashed Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(request.body.password, salt)

        // Register new user to Database
        const data = [ 
            request.body.name,
            request.body.email,
            hashedPassword
        ]
        const statement = `INSERT INTO users(name, email, password) VALUES(?, ?, ?)`
        connection.execute(statement, data, (error) => {
            if (error) return response.status(500).send("Internal Server Error")
            response.status(201).send(`${request.body.name} your account have been created`)
        })
    })
})