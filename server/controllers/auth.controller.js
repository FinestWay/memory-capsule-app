// server/controllers/auth.controller.js

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const saltRounds = 10
const secretKey = process.env.SECRET_KEY // Replace with a secure value or load from environment

export const registerUser = async (req, res) => {
  const { email, password } = req.body
  // Access the database instance attached in app.locals (see index.js)
  const db = req.app.locals.db
  try {
    // Check if the user already exists
    const existingUser = await db.collection('users').findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }
    // Hash the password and store the user
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    await db.collection('users').insertOne({ email, password: hashedPassword })
    return res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('Registration error:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  const db = req.app.locals.db
  try {
    // Find the user by email
    const user = await db.collection('users').findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    // Generate a JWT token valid for 1 hour
    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: '1h'
    })
    return res.status(200).json({ token })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
