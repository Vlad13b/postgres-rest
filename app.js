const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const boolParser = require('express-query-boolean')
// const rateLimit = require('express-rate-limit')
// const  limiterAPI  = require('./helpers/constants')

const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/user')
const authRouter = require('./routes/api/auth')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet())
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({ limit: 10000 }))
app.use(boolParser())

// app.use('/api/', rateLimit(limiterAPI))
app.use('/api/auth', authRouter)
app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message })
})

module.exports = app