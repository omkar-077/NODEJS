const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        require: true
    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    role:{
        type: String,
        enum :["user", "artist"],   // enum => defines types of users
        default: "user"
    }
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel;