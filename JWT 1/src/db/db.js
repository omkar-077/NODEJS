const mongoose = require('mongoose');

async function connectdb(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DataBase Connected Successfully...");

    }catch(err){
        console.error("Database Connection Error...", err);
    }
}

module.exports = connectdb; 