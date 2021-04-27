import Joi from 'joi'

// NEW USER DATA VALIDATION
const validateCreate = data => {
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
const validateEmail = data => {
    const schema = Joi.object({
        email: Joi.string().required().min(5).email(),
    })
    return schema.validate(data)
}

// PUT - USER PASSWORD RESET VALIDATION
const validatePassword= data => {
    const schema = Joi.object({
        password: Joi.string().required().min(8),
    })
    return schema.validate(data)
}

const _validateCreate = validateCreate
export { _validateCreate as validateCreate }
const _validateLogin = validateLogin
export { _validateLogin as validateLogin }
const _validateEmail = validateEmail
export { _validateEmail as validateEmail }
const _validatePassword = validatePassword
export { _validatePassword as validatePassword }