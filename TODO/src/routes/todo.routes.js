const express = require('express')
const { createTodo, getTodo, getTodosById} = require('../controller/todo.controller')

const route = express.Router();


// route.get('/', (req,res)=>{
//     res.send('Todo app is running')
// })

// create todo
route.post('/add', createTodo)

// get todo
route.get('/', getTodo)

// get todo by id
route.get('/:id', getTodosById)


module.exports = route