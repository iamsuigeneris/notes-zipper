const express = require("express")
// const notes = require("./data/notes")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const userRoutes = require('./routes/userRoutes')
const noteRoutes = require('./routes/noteRoutes')
const { errorHandler, notFound } = require("./middlewares/errorMiddleware")

const app = express()
dotenv.config()
connectDB()
app.use(express.json())


app.get("/", (req, res) => {
    res.send("API is running...")
})

app.use('/api/users', userRoutes)
app.use('/api/notes', noteRoutes)

// error middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(5000, () => {
    console.log(`Server started on port ${PORT}`)
})