const todoModel = require('../models/todo.models')
const mongoose = require('mongoose')

async function createTodo(req, res) {
    try {
        const { title, description } = req.body

        // validation 
        if (!title || title.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            })
        }
        const todo = await todoModel.create({
            title,
            description
        })
        return res.status(201).json({
            success: true,
            message: "Todo created Successfully",
            todo
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server error",
            error: error.message
        })
    }
}

async function getTodo(req, res) {
    try {

        // Query param
        const { search, sort, page = 1, limit = 10 } = req.query;

        //Base Query
        let query = {};

        // Search by title

        if (search) {
            query.title = { $regex: search, $options: "i" };  // i for case insensitive
        }

        // Sorting
        let sortOption = {};
        if (sort === "asc") {
            sortOption.createdAt = 1;     // ascending sorting
        } else if (sort === "desc") {
            sortOption.createdAt = -1;   // desending sorting
        } else {
            sortOption.createdAt = -1;  // default sorting
        }

        // Pagination
        const skip = (page - 1) * limit;

        const todos = await todoModel.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(parseInt(limit));

        const totalTodos = await todoModel.countDocuments(query);

        return res.status(200).json({
            success: true,
            message: "Todos Fetched Successfully",
            total: totalTodos,
            page: Number(page),
            limit: Number(limit),
            data: todos
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// get todo by :id
async function getTodosById(req, res) {
    try {
        const { id } = req.params;

        // validate id based in mongoose
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return re.status(400).json({
                success: false,
                message: "Invalid Todo ID"
            })
        }

        const todo = await todoModel.findById(id);

        //if todo not found
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            })
        }

        // if todo found

        return res.status(200).json({
            success: true,
            message: "Todo fetched Successfully",
            data: todo
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// update todo
async function updateTodo(req,res){
    try{
        const { id } = req.params;
        const { title, description } = req.body;

        // valid id based on mongoose

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message: "Invalid Todo Id"
            })
        }

        //valid Input

        if(!title || title.trim() === ""){
            return res.status(400).json({
                message: "Title is required"
            })
        }

        //update todo

        const todo = await todoModel.findByIdAndUpdate(
            id,
            { title, description},
            { new: true, runValidators: true} //toreturn the updated document
        )

        // if todo not found

        if(!todo){
            return res.status(404).json({
                message: "Todo not found"
            })
        }

        // if todo found and updated

        return res.status(200).json({
            message: "Todo updated Successfully",
            data: todo
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// Toggle todo by id patch api

async function toggleTodo(req,res){
    try{
        const { id } = req.params;

         //Validate ID based on mongoose
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid Todo ID",
            });
        }

        //GET current todo
        const todo = await todoModel.findById(id);

        //If todo not found
        if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        //Flip the isCompleted field
        todo.isCompleted = !todo.isCompleted;

        await todo.save();

        //If todo found and updated
        return res.status(200).json({
            success: true,
            message: "Todo toggled successfully",
            data: todo,
        });


    }catch(error){
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

// Delete todo by id
async function deleteTodo(req,res){
    try{
        const { id } = req.params;

        //Validate ID based on mongoose
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                success: false,
                message: "Invalid Todo ID",
            });
        }

        //Delete todo
        const todo = await todoModel.findByIdAndDelete(id)

        //If todo not found
        if(!todo){
            return res.status(404).json({
                message: "Todo not found"
            })
        }
        
        // if todo found then delete it
        return res.status(200).json({
            success: true,
            message: "Todo deleted Successfully",
            data: todo
        })

    }catch(error){
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

module.exports = { createTodo, getTodo , getTodosById, updateTodo, toggleTodo, deleteTodo} 