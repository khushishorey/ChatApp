import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser"

dotenv.config()
connectDB()

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoute)

const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>{
    console.log(`🚀 Server running on port ${PORT}`);
})