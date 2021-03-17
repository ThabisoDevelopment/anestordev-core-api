const Joi = require('joi')

// NEW USER DATA VALIDATION
const validateRegistration = data => {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().required().min(5).email(),
        password: Joi.string().required().min(8),
    })
    return schema.validate(data)
}

// POST - USER AUTHENTICATION VALIDATION
const validateLogin = data => {
    const schema = Joi.object({
        email: Joi.string().required().min(5).email(),
        password: Joi.string().required().min(8),
    })
    return schema.validate(data)
}

// POST - USER EMAIL PASSWORD RESET VALIDATION
const validatePasswordResetEmail = data => {
    const schema = Joi.object({
        email: Joi.string().required().min(5).email(),
    })
    return schema.validate(data)
}

// PUT - USER PASSWORD RESET VALIDATION
const validatePasswordResetPassword = data => {
    const schema = Joi.object({
        password: Joi.string().required().min(8),
    })
    return schema.validate(data)
}

module.exports.validateRegistration = validateRegistration
module.exports.validateLogin = validateLogin
module.exports.validatePasswordResetEmail = validatePasswordResetEmail
module.exports.validatePasswordResetPassword = validatePasswordResetPassword