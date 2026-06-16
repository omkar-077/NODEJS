const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function registerUser(req,res){
    const { username, email, password } = req.body;

    const user = await userModel.create({
        username, email, password
    })

    const isuseralreadyregister = await userModel.findOne({
        email
    })

    if(isuseralreadyregister){
        return res.status(409).json({
            message :"user already register"
        })
    }
    
    // sign() => function to create jwt token

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    //res.cookie("Cookie Name", token)

    res.cookie("token", token) // server can access data in cookies, with every request data in cookies go in server 
    res.status(201).json({
        message: "User register Successfully..",
        user,
    })
}

module.exports = {registerUser}