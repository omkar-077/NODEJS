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

module.exports = { createTodo, getTodo , getTodosById}