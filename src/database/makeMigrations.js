import create_users_table from "./migrations/createUsersTable.js"


export const migrate = ()=> {
    create_users_table()
    // console.info("Create users table")
}