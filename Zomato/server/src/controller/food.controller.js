const foodModel = require('../models/food.model')
const storageService = require('../service/storage.service')
const { v4: uuid } = require('uuid')


async function createFood(req, res){
    console.log(req.foodPartner)
    console.log(req.body)
    console.log(req.file)

    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())

    // console.log(fileUploadResult)

    // creating food item
    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })


    res.status(201).json({
        message: "Food created Successfully",
        food: foodItem
    })
}

async function getFoodItems(req,res){
    const foodItems = await foodModel.find({})
    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    })
}

module.exports = { createFood , getFoodItems}