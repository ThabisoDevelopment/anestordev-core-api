import connection from '../database/connection'
import { authorized } from '../middleware/authorization'

class CommentController {

    async all (request, response) {
        const types = ['article', 'question']
        if (!types.includes(request.query.type)) return response.status(400).send({ message: "comment type is not allowed"})
        try {
            const data = [
                request.query.type,
                request.params.id,
            ]

            const statement = "SELECT * FROM comments WHERE type=? AND type_id=?"
            const results = await connection.promise().query(statement, data)
            response.status(200).send(results[0])
        } catch (error) {
            response.status(400).send({ message: error.message })
        }
    }

    async comment(request, response) {
        const types = ['article', 'question']
        if (!types.includes(request.body.type)) return response.status(400).send({ message: "comment type is not allowed"})
        if (!request.body.comment) return response.status(422).send("comment message is required")
        try {
            const data = [
                request.user.id,
                request.body.type,
                request.params.id,
                request.body.comment
            ]

            const insertStatement = "INSERT INTO comments(user_id, type, type_id, comment) VALUES(?, ?, ?, ?)"
            const results = await connection.promise().query(insertStatement, data)
            response.status(201).send({ message: 'You have commented', id: results[0].insertId })
        } catch (error) {
            response.status(400).send({ message: error.message })
        }
    }

    async destroyComment(request, response) {
        try {
            const isAuthorized = await authorized(request, 'comments')
            if(!isAuthorized) throw new Error("Unauthorized to delete comment")
            const statement = "DELETE FROM comments WHERE id=?"
            await connection.promise().query(statement, [ request.params.id ])
            const replies = "DELETE FROM comment_replies WHERE comment_id=?"
            await connection.promise().query(replies, [ request.params.id ])
            response.status(200).send({ message: 'comment removed' })

        } catch (error) {
            response.status(400).send({ message: error.message })
        }
    }

    async reply(request, response) {
        if (!request.body.reply) return response.status(422).send("reply message is required")
        try {
            const data = [
                request.user.id,
                request.params.id,
                request.body.reply
            ]

            const insertStatement = "INSERT INTO comment_replies(user_id, comment_id, reply) VALUES(?, ?, ?)"
            const results = await connection.promise().query(insertStatement, data)
            response.status(201).send({ message: 'reply message sent', id: results[0].insertId })
        } catch (error) {
            response.status(400).send({ message: error.message })
        }
    }

    async destroyReply(request, response) {
        try {
            const isAuthorized = await authorized(request, 'comment_replies')
            if(!isAuthorized) throw new Error("Unauthorized to delete reply message")
            const statement = "DELETE FROM comment_replies WHERE id=?"
            await connection.promise().query(statement, [ request.params.id ])
            response.status(200).send({ message: 'reply message removed' })
        } catch (error) {
            response.status(400).send({ message: error.message })
        }
    }
    

}

export default new CommentController