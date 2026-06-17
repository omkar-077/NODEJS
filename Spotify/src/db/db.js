const mongoose = require('mongoose')

async function connectdb(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected Successfully...")

    }catch(err){
        console.error("Database Not connected", err)
    }
}

module.exports = connectdb;