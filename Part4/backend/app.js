const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')


// Connect to the database and inform the programmer that you connected only if not in test mode
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
      logger.info('Connected to MongoDB')
      })
      .catch(err => {
        logger.error('Error connecting to MongoDB:', err)
  })
}

const app = express()
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

// Give the path for the router
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })
}


module.exports = app