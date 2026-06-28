const express = require('express')
const { createTodo, getTodo, getTodosById, updateTodo, toggleTodo, deleteTodo} = require('../controller/todo.controller')

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

// update todo
route.put('/:id', updateTodo)

// toggle todo
route.patch('/:id/toggle', toggleTodo)

// delete todo
route.delete('/:id', deleteTodo)

module.exports = route