import connection from "../connection"

const statement = `CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    img_url TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
)`

const create_users_table = async() => {
    try {
        const results = await connection.promise().query(existsQuery)
        console.log(results)
    } catch (error) {
        console.error(error.message)
    }
}

export default create_users_table