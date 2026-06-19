const express = require('express')
const userModel = require('../models/user.model')


/**
 * @name registerUserController
 * @description Register a New User, expects username, email and password in the request body
 * @access Public
 */

async function registerUserController(req, res){
    const { username, email, password } = req.body;

    if(!username || email || password){
        return res.status(400).json({
            message: "All fields are required"
        })
    }

    const isUserAlreadyExists  = await userModel.findOne({
        $or: [ { username }, { email } ]
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "Account already exists with this username or email"
        })
    }

}

module.exports = { registerUserController }