const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    video:{
        type: String, // bcoz video is store on imagekit(cloud) only URL is store in data base
        required: true
    },
    description:{
        type: String
    },
    foodPartner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodpartner"
    }
})

const foodModel = mongoose.model('food', foodSchema)

module.exports = foodModel