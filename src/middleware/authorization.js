const connection = require("../database/connection")

const authorized = async (request, tableName) => {
    try {
        const statement = `SELECT user_id FROM ${tableName} WHERE id=?`
        const data = await connection.promise().query(statement, [ request.params.id ])
        if (data[0].length < 1) return false
        console.log(request.user)
        if (data[0][0].user_id != request.user.id) return false
        return true
    } catch (error) {
        console.log(error.message)
        return false
    }
}

module.exports.authorized = authorized