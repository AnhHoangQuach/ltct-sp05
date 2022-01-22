require('dotenv').config()
const express = require('express')
const connectToDb = require('./utils/db')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000

const apiRouter = require('./routes')

app.use(cors())
app.use(express.json())

app.use('/api', apiRouter)

connectToDb()

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
