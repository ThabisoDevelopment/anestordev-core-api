import Joi from 'joi'

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

const _validateCreate = validateCreate
export { _validateCreate as validateCreate }
const _validateUpdate = validateUpdate
export { _validateUpdate as validateUpdate }
const _validatePublishArticle = validatePublishArticle
export { _validatePublishArticle as validatePublishArticle }
const _validateSettingsArticle = validateSettingsArticle
export { _validateSettingsArticle as validateSettingsArticle }