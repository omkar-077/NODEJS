const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, "Title is required"],
            trim: true
        },
        description:{
            type:String,
            default: ""
        },
        isCompleted:{
            type: Boolean,
            default: false
        }, 
    },{ timestamps: true}
)

const todoModel = mongoose.model("todo",todoSchema)

module.exports = todoModel