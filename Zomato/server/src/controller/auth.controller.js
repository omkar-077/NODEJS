const userModel = require('../models/user.model')
const foodPartnerModel = require('../models/food.partner')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function registerUser(req,res){
    const { fullName, email, password } = req.body;
  
// checking if user (email) already exists when it comes from client side 
    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "User Already Exists"
        })
    }

// hash password 
    const hashedPassword = await bcrypt.hash(password, 10)

// create user
    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id,
    },process.env.JWT_SECRET)
    res.cookie("token", token)

    // 201 - new resource created
    res.status(201).json({
        message: "User Registered Successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName 
        }
    })
}

async function loginUser(req,res){
    const { email, password } = req.body;

// 1st check email exists or not 
    const user = await userModel.findOne({
        email
    })

    if(!user){
        return res.status(400).json({
            message: "Invalid User or Password"
        })
    }

// if email exists then compare password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid User or Password"
        })
    }

// if we get user and password is also matched the generate token
     
    const token = jwt.sign({
        id: user._id,
    },process.env.JWT_SECRET)
    res.cookie("token", token)
    res.status(200).json({
        message: "User Logged in Successfully",
        user:{
            _id: user._is,
            email: user.email,
            fullName: user.fullName
        }
    })

}

async function logoutUser(req,res){
    res.clearCookie("token")
    res.status(200).json({
        message: "User logout Successfully"
    })
}

// Food partner

async function registerFoodPartner(req,res){
    const { name, email, password } = req.body;

// 1st check if account exist or not , if not then create account , then create token and set in cookie

    const isAccountAlreadyExists = await foodPartnerModel.findOne({
        email
    })
    if(isAccountAlreadyExists){
        return res.status(400).json({
            message: "Food partner account Already Exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: foodPartner._id,
    },process.env.JWT_SECRET)

    // set token in cookie
    res.cookie("token", token)

    res.status(201).json({
        message: "Food Partner Registerd Successfully",
        foodPartner:{
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    })
}

async function loginFoodPartner(req,res){
    const { email, password } = req.body;

// check if email exists in database or not
    const foodpartner = await foodPartnerModel.findOne({
        email
    })

    if(!foodpartner){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
// check for password
    const isPasswordValid = await bcrypt.compare(password, foodpartner.password)
    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid email or pass"
        })
    }
// if both match then generate token and save it in cookie
    const token = jwt.sign({
        id: foodpartner._id
    }, process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(201).json({
        message: "Food Partner Logged in Successfully",
        foodpartner:{
            _id:foodpartner._id,
            email: foodpartner.email,
            name: foodpartner.name
        }
    })
}

async function logoutFoodPartner(req,res){
    res.clearCookie("token")
    res.status(200).json({
        message: "User logout Successfully"
    })
}

module.exports = { registerUser , loginUser, logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner}