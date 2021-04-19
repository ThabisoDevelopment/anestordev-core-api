const Joi = require('joi')

// CREATE ARTICLE VALIDATION FOR POST REQUEST
const validateCreate = data => {
    const schema = Joi.object({
        title: Joi.string().required().min(3),
        description: Joi.string().required().min(3),
        draft: Joi.required(),
        published: Joi.required(),
        likable: Joi.required(),
        commentable: Joi.required(),
        contributable: Joi.required(),
        show_views: Joi.required(),
    })
    return schema.validate(data)
}

// UPDATE ARTICLE VALIDATION FOR PUT REQUEST
const validateUpdate = data => {
    const schema = Joi.object({
        title: Joi.string().required().min(3),
        description: Joi.string().required().min(3)
    })
    return schema.validate(data)
}

// PUBLISH ARTICLE VALIDATION FOR PUT REQUEST
const validatePublishArticle = data => {
    const schema = Joi.object({
        draft: Joi.required(),
        published: Joi.required(),
    })
    return schema.validate(data)
}

// SETTINGS ARTICLE VALIDATION FOR PUT REQUEST
const validateSettingsArticle = data => {
    const schema = Joi.object({
        likable: Joi.required(),
        commentable: Joi.required(),
        contributable: Joi.required(),
        show_views: Joi.required(),
    })
    return schema.validate(data)
}

module.exports.validateCreate = validateCreate
module.exports.validateUpdate = validateUpdate
module.exports.validatePublishArticle = validatePublishArticle
module.exports.validateSettingsArticle = validateSettingsArticle