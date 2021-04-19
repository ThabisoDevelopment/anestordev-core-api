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
const authenticationRoutes = require("./src/routes/authentication")
const userRoutes = require("./src/routes/user")
const articleRoutes = require("./src/routes/articles")

// Route Middleware
app.use("/api/auth", authenticationRoutes)
app.use("/api/users", userRoutes)
app.use("/api/articles", articleRoutes)

// Server Listening
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log(`Server Running on port: ${PORT}`))
