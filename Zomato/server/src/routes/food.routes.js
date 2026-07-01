const express = require('express')
const foodController = require('../controller/food.controller')
const authMiddleware = require('../middleware/auth.middleware')
const router = express.Router()
const multer = require('multer')


// enables file sharing
const upload = multer({
    storage: multer.memoryStorage()
})

/** POST /api/food/  Protected : middleware is used to protect route */  
router.post('/', authMiddleware.authFoodPartnerMiddleware ,upload.single('video'), foodController.createFood)

router.get('/', authMiddleware.authUserMiddleware, foodController.getFoodItems)

module.exports = router