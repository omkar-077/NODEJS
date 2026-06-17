const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function registerUser(req,res){
    const { username, email, password, role = "user" } = req.body;  

    const isuserAlreadyExists = await userModel.findOne({
        $or:[
            { username },
            { email }
        ]
    })

    if(isuserAlreadyExists){
        return res.status(409).json({
            message: "User Already Exists"
        })
    }
    
    // hashing => converts plain password in unreadable format to store in database [Hashing is a process of converting data (like a password) into a fixed-length string that cannot be easily reversed.]

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash,
        role
    })

    const token = jwt.sign({
        id: user._id,
        role: user.role
    },process.env.JWT_SECRET)

    res.cookie("token",token)
    res.status(201).json({
        message: "User Created Successfully...",
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })



}


async function loginUser(req,res){
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or:[
            { username },
            { email }
        ]
    })
    
    if(!user){
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }
    
    // password enter by user converted into hash then compare with hash present in database , if matched then user successfully logedin
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    },process.env.JWT_SECRET)

    res.cookie("token",token)
    res.status(200).json({
        message: "Logged in successfully... ",
        user:{
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })

}

module.exports = { registerUser, loginUser };