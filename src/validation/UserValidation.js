import Joi from 'joi'

// NEW USER DATA VALIDATION
const validateUser = data => {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        bio: Joi.string()
    })
    return schema.validate(data)
}

const _validateUser = validateUser
export { _validateUser as validateUser }