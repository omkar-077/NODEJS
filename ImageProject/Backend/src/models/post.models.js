const mongoose = require('mongoose')

const postschema = new mongoose.Schema({
    image: String,
    caption: String
})

const postModel = mongoose.model("post", postschema)  // post = name of collection [it cam be any name] 

module.exports = postModel