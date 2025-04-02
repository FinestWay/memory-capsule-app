// server/index.js
import express from 'express'
import { MongoClient } from 'mongodb'
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// Middleware to parse JSON bodies
app.use(express.json())

// Connect to MongoDB
const uri = process.env.MONGO_URI // Replace with your MongoDB URI
const client = new MongoClient(uri, { useUnifiedTopology: true })

async function connectDB () {
  try {
    await client.connect()
    console.log('Connected to MongoDB')
    const db = client.db('timeCapsule') // use your desired database name
    // Attach db instance so controllers can access it
    app.locals.db = db
  } catch (error) {
    console.error('MongoDB connection error:', error)
  }
}
connectDB()

// Mount authentication routes under /api/auth
app.use('/api/auth', authRoutes)

// Base route for testing
app.get('/', (req, res) => {
  res.send('Digital Time Capsule API is running!')
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
