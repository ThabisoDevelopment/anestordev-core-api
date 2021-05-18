import dayjs from 'dayjs'
import connection from '../database/connection'
import { authorized } from "../middleware/authorization"
import { validateCreate, validateUpdate, validateSettings } from '../validation/ArticleValidation'

class ArticleController {
    async index(request, response) {
        try {
            const statement = "SELECT * FROM articles WHERE published=1 LIMIT 10"
            const articles = await connection.promise().query(statement)
            response.send(articles[0])
        } catch (error) {
            response.status(500).send({ message: error.message })
        }
    }

    

    async getById(request, response) {
        try {
            const statement = "SELECT * FROM articles WHERE id=?"
            const articleResults = await connection.promise().query(statement, [ request.params.id ])
            if (articleResults[0].length < 1) throw new Error('Sorry! this article does not exist anymore')
            const article = articleResults[0][0]

            const userStatement = "SELECT id, name, img_url FROM users WHERE id=?"
            const userResults = await connection.promise().query(userStatement, [ article.user_id ])
            const user = userResults[0][0]
            user.authorized = false
            if (request.user && request.user.id == article.user_id) user.authorized = true
            
            const type = [ 'article', article.id ]
            // count comment && likes && views
            const commentsStatement = "SELECT count(id) AS count FROM comments WHERE type=? AND type_id=?"
            const comments = await connection.promise().query(commentsStatement, type)

            const likesStatement = "SELECT count(id) AS count FROM likes WHERE type=? AND type_id=?"
            const likes = await connection.promise().query(likesStatement, type)

            const viewsStatement = "SELECT count(id) AS count FROM views WHERE type=? AND type_id=?"
            const views = await connection.promise().query(viewsStatement, type)

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
                created_at: dayjs(article.created_at).format("DD-MMM-YYYY HH:mm"),
                updated_at: dayjs(article.updated_at).format('DD-MMM-YYYY HH:mm'),
                comments: comments[0][0].count,
                likes: likes[0][0].count,
                views: views[0][0].count,
                user: {
                    id: user.id,
                    name: user.name,
                    img_url: user.img_url,
                    authorized: user.authorized
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
            if (error) return response.status(500).send({ message: error.message })
            response.send({ message: "Article Updated Successful" })
        }) 
    }
    
    async settings(request, response) {
        const { error } = validateSettings(request.body)
        if (error) return response.status(422).send({ message: error.details[0].message })
        const isAuthorized = await authorized(request, 'articles')
        if(!isAuthorized) return response.status(401).send({ message: "You are not authorized to update this article"})
        // Update Article in Database
        const data = [
            request.body.likeble,
            request.body.commentable,
            request.body.contributable,
            request.body.show_views,
            request.params.id
        ]
        const statement = `UPDATE articles SET likable=?, commentable=?, contributable=?, show_views=? WHERE id=?`
        connection.query(statement, data, error => {
            if (error) return response.status(500).send({ message: error.message })
            response.send({ message: "Article settigns updated" })
        }) 
    }
}

export default new ArticleController