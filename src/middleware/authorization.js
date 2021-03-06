import connection from "../database/connection"

export const authorized = async (request, tableName) => {
    try {
        const statement = `SELECT user_id FROM ${tableName} WHERE id=?`
        const data = await connection.promise().query(statement, [ request.params.id ])
        if (data[0].length < 1) return false
        if (data[0][0].user_id != request.user.id) return false
        return true
    } catch (error) {
        console.log(error.message)
        return false
    }
}