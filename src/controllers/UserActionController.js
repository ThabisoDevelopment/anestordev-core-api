import connection from '../database/connection'
import { authorized } from '../middleware/authorization'

class UserActionController {
    
    // Like artcile || question || etc
    async like(request, response) {
        const types = ['article', 'question']
        if (!types.includes(request.body.type)) return response.status(400).send({ message: "Server Error: Like type is invalid"})

        try {
            const data = [
                request.user.id,
                request.body.type,
                request.params.id,
            ]
            const countStatement = "SELECT COUNT(id) as count FROM likes WHERE user_id=? AND type=? AND type_id"
            const likeExists = await connection.promise().query(countStatement, data)
            console.log(likeExists[0][0].count)
            if (likeExists[0][0].count > 0) throw new Error('You already like this '+ request.body.type)

            const insertStatement = "INSERT INTO likes(user_id, type, type_id) VALUES(?, ?, ?)"
            const results = await connection.promise().query(insertStatement, data)
            response.status(201).send({ message: 'like successful', id: results[0].insertId})
        } catch (error) {
            response.status(400).send({ message: error.message })
        }
    }
    
    // view action for artice || question || etc
    async view(request, response) {
        const types = ['article', 'question']
        if (!types.includes(request.body.type)) return response.status(400).send({ message: "Server Error: Like type is invalid"})
        try {
            const data = [
                request.user.id,
                request.body.type,
                request.params.id,
            ]
            const queryViews = "SELECT id, viewed FROM views WHERE user_id=? AND type=? AND type_id"
            const views = await connection.promise().query(queryViews, data)
            if (views[0].length > 0) {
                const view_id = views[0][0].id
                const new_viewed = views[0][0].viewed + 1
                const updateStatement = "UPDATE views SET viewed=? WHERE id=?"
                await connection.promise().query(updateStatement, [ new_viewed, view_id ])
                return response.send({ message: 'views updated'})
            }

            const insertStatement = "INSERT INTO views(user_id, type, type_id) VALUES(?, ?, ?)"
            const results = await connection.promise().query(insertStatement, data)
            response.status(201).send({ message: 'new view success', id: results[0].insertId})
        } catch (error) {
            response.status(400).send({ message: error.message })
        }
    }

}

export default new UserActionController