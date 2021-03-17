const router = require('express').Router()
const connection = require('../database/connection');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { validatePasswordResetEmail, validatePasswordResetPassword } = require('../validation');
const { verifyPasswordReset } = require('../verifyToken');

// Send Email to User with PASSWORD RESET TOKEN and route
router.post("/password/reset", (request, response) => {
    const { error } = validatePasswordResetEmail(request.body)
    if (error) return response.status(422).send(error.details[0].message)

    // Check if email Exits
    const statement = `SELECT id, name, email FROM users WHERE email=?`
    connection.execute(statement, [ request.body.email ], async(error, results) => {
        if (error) return response.status(500).send("Internal Server Error")
        if (results.length < 1) return response.status(422).send("Sorry! Pleace enter your correct email address")
        
        const user = results[0]
        const token = jwt.sign({id: user.id}, process.env.JWT_PASSWORD_RESET, { expiresIn: '60min'})

        /**
         * Sign a Password Reset JWT token and send an email to user
         * jwt sing JWT_PASSWORD_RESET
         */
        response.send({"success": "password reset email sent", token})
    })
})

// Update User Password
router.put("/password/reset", verifyPasswordReset, async(request, response) => {
    const { error } = validatePasswordResetPassword(request.body)
    if (error) return response.status(422).send(error.details[0].message)

    // Generate a Hashed Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(request.body.password, salt)
    const data = [ hashedPassword, request.user.id ]

    const statement = `UPDATE users SET password=? WHERE id=?`
    connection.execute(statement, data, (error) => {
        if (error) return response.status(500).send("Internal Server Error")
        /**
         * Revoke Access token
         */
         response.send({ message: "Password Updated"})
    })
})

module.exports = router