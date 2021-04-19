const connection = require('../database/connection')
const { authorized } = require("../middleware/authorization")
const { validateCreate, validateUpdate } = require('../validation/ArticleValidation');

class ArticleController {
    async index(request, response) {
        try {
            const statement = "SELECT * FROM articles LIMIT 10"
            const results = await connection.promise().query(statement)
            const data = results[0]
            response.send(data)
        } catch (error) {
            response.status(500).send("Internal Server Error")
        }
    }

    getById(request, response) {
        const statement = "SELECT * FROM articles WHERE id=?"
        connection.execute(statement, [ request.params.id ], (error, results) => {
            if (error) return response.status(500).send("Internal Server Error")
            if (results.length < 1) return response.status(404).send("The article you looking for in not found")
            response.send(results[0])
        })
    }

    create(request, response) {
        const { error } = validateCreate(request.body)
        if (error) return response.status(203).send({ error:  error.details[0].message })
        // Add New Article To Database
        const data = [
            request.user.id,
            request.body.title,
            request.body.description,
            request.body.draft,
            request.body.published,
            request.body.likable,
            request.body.commentable,
            request.body.contributable,
            request.body.show_views
        ]
        const statement = `INSERT INTO 
                articles(user_id, title, description, draft, published, likable, commentable, contributable, show_views)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`
        connection.execute(statement, data, (error, results) => {
            if (error) return response.status(500).send("Internal Server Error")
            response.status(201).send({ id: results.insertId })
        })
    }

    async update(request, response) {
        const { error } = validateUpdate(request.body)
        if (error) return response.status(203).send({ error:  error.details[0].message })
        const isAuthorized = await authorized(request, 'articles')
        if(!isAuthorized) return response.status(401).send("Unauthorized")
        // Update Article in Database
        const data = [
            request.body.title,
            request.body.description,
            request.params.id
        ]
        const statement = `UPDATE articles SET title=?, description=? WHERE id=?`
        connection.query(statement, data, error => {
            if (error) return response.status(500).send("Internal Server Error")
            response.send("Article Have Updated!")
        }) 
    }
}

module.exports = new ArticleController