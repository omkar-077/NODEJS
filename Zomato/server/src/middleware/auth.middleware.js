const foodPartnerModel = require('../models/food.partner')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

async function authFoodPartnerMiddleware(req,res,next){
    //   console.log("Cookies:", req.cookies);

    const token = req.cookies.token
   
    // console.log("Token:", token);

    if(!token){
        return res.status(401).json({
            message: "Please Login 1st"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //   console.log("Decoded:", decoded);

        const foodPartner = await foodPartnerModel.findById(decoded.id)
        // console.log("Food Partner:", foodPartner);
        req.foodPartner = foodPartner   
        next()

    }catch(err){
        console.log(err)
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
}

async function authUserMiddleware(req,res,next){
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log("Decoded:", decoded);

        const user = await userModel.findById(decoded.id);
        // console.log("Food Partner:", foodPartner);

        req.user = user

        next()

    } catch (err) {
        // console.log(err)
        // console.error(err)

        return res.status(401).json({
            message: "Invalid token"
        })

    }
}

module.exports = { authFoodPartnerMiddleware , authUserMiddleware}