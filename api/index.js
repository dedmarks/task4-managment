import express from "express"
import cors from "cors"
import bodyparser from "body-parser"
import cookieParser from "cookie-parser"
import sessios from "express-session"
import userRoutes from "./routs/users.js"
import authRoutes from "./routs/auth.js"
import sql from "mysql"

const app = express()

app.use(express.json());
app.use(cors())
app.use(cookieParser())
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

app.listen(3001, () => {
    console.log("running server")
})

