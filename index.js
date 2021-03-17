require('dotenv/config')
const express = require("express")
const cors = require("cors")

// Initializing or Starting Express Server
const app = express()

// CORS Middleware and enable body-parser
const corsOptions = {
    origin: '*',
    methods: "GET, POST, PUT, PATCH, DELETE",
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(express.json())

// Importing Routes
const login = require("./src/routes/login")
const register = require("./src/routes/register")
const passwordReset = require("./src/routes/passwordReset")
const currentUser = require("./src/routes/currentUser")

// Route Middleware
app.use("/api/auth", login) /** Post Toute to Login */
app.use("/api/auth", register) /** Post Route to Register */
app.use("/api/auth", passwordReset) /** Password Reset have #POST and #PUT */
app.use("/api/auth", currentUser) /** #GET and #PUT */


// Server Listening
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log(`Server Running on port: ${PORT}`))

