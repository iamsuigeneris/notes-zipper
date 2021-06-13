const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true
        })
        console.log(`MongoDB successfully connected! ${conn.connection.host}`)
    } catch (err) {
        console.error(`Error: ${err.message}`)
        process.exit()
    }
}

module.exports = connectDB