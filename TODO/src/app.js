const express = require('express')
const cors = require('cors')
const route = require('./routes/todo.routes')
 

const app = express()
// middleware
app.use(cors())
app.use(express.json())

// routes
app.use('/api/todos', route)
module.exports = app