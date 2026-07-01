const express = require('express')
const authcontroller = require('../controller/auth.controller')

const router = express.Router()

/*
router.post('register', (req,res)=>{
    
}) **/

// (req,res)=>{   
                   // controller [in new file]
// }

/**
 * @route - Register API
 */
router.post('/user/register',authcontroller.registerUser)

/**
 * @route - Login API
 */
router.post('/user/login', authcontroller.loginUser)

/**
 * @route - Logout  API
 */
router.get('/user/logout', authcontroller.logoutUser)

// Food partner routes

router.post('/foodpartner/register', authcontroller.registerFoodPartner)
router.post('/foodpartner/login', authcontroller.loginFoodPartner)
router.get('/foodpartner/logout', authcontroller.logoutFoodPartner)

module.exports = router