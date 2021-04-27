import connection from '../database/connection'
import { authorized } from "../middleware/authorization"
import { validateCreate, validateUpdate } from '../validation/ArticleValidation'

class ArticleController {
    async index(request, response) {
        try {
            const statement = "SELECT * FROM articles LIMIT 10"
            const results = await connection.promise().query(statement)
            const data = results[0]
            response.send(data)
        } catch (error) {
            response.status(500).send({ message: "Internal Server Error" })
        }
    }

    async getById(request, response) {
        try {
            const statement = "SELECT * FROM articles WHERE id=?"
            const articleResults = await connection.promise().query(statement, [ request.params.id ])
            const article = articleResults[0][0]

            const userStatement = "SELECT id, name, img_url FROM users WHERE id=?"
            const userResults = await connection.promise().query(userStatement, [ article.user_id ])
            const user = userResults[0][0]
            
            // count views && likes && comments
            const commentsStatement = "SELECT count(id) AS count FROM article_comments WHERE article_id=?"
            const comments = await connection.promise().query(commentsStatement, [ article.user_id ])

            const data = {
                id: article.id,
                title: article.title,
                description: article.description,
                draft: article.draft,
                published: article.published,
                likable: article.likable,
                commentable: article.commentable,
                contributable: article.contributable,
                show_views: article.show_views,
                created_at: article.created_at,
                updated_at: article.updated_at,
                comments: comments[0][0].count,
                likes: 0,
                views: 0,
                user: {
                    id: user.id,
                    name: user.name,
                    img_url: user.img_url
                }
            }
            response.send(data)
        } catch (error) {
            response.status(500).send({ message: error.message })
        }
    }

    create(request, response) {
        const { error } = validateCreate(request.body)
        if (error) return response.status(422).send({ message: error.details[0].message })
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
            if (error) return response.status(500).send({ message: "Internal Server Error" })
            response.status(201).send({ message: "Article Created Successfuly", id: results.insertId })
        })
    }

    async update(request, response) {
        const { error } = validateUpdate(request.body)
        if (error) return response.status(422).send({ message: error.details[0].message })
        const isAuthorized = await authorized(request, 'articles')
        if(!isAuthorized) return response.status(401).send({ message: "You are not authorized to update this article"})
        // Update Article in Database
        const data = [
            request.body.title,
            request.body.description,
            request.params.id
        ]
        const statement = `UPDATE articles SET title=?, description=? WHERE id=?`
        connection.query(statement, data, error => {
            if (error) return response.status(500).send({ message: "Internal Server Error" })
            response.send({ message: "Article Updated Successful" })
        }) 
    }
}

export default new ArticleController