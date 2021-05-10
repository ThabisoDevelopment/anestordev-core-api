import 'dotenv/config'
import express, { json } from "express"
import cors from "cors"

// Initializing or Starting Express Server
const app = express()

// CORS Middleware and enable body-parser
const corsOptions = {
    origin: '*',
    methods: "GET, POST, PUT, PATCH, DELETE",
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(json())

// Importing Routes
import authenticationRoutes from "./routes/authentication"
import userRoutes from "./routes/user"
import articleRoutes from "./routes/articles"
import commentRoutes from "./routes/comments"

// Route Middleware
app.use("/api/oauth", authenticationRoutes)
app.use("/api/users", userRoutes)
app.use("/api/articles", articleRoutes)
app.use("/api/comments", commentRoutes)

// Server Listening
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log(`Server Running on port: ${PORT}`))
