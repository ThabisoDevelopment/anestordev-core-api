const connection = require("../connection")

const statement = `CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    img_url TEXT,    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
)`

const create_users_table = () => {
    connection.query(statement, (error, results) => {
        if (error) return console.log(error)
        console.log("users table created")
    })
}

module.exports = create_users_table