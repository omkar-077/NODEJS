const mongoose = require('mongoose')

// function to connect database 

async function connectDB (){
    await mongoose.connect('mongodb+srv://Omkar:Ig1IntnrEiQTW4XU@basic.f6pxi1v.mongodb.net/Autodb')  // Autodb - automatically db gets created

    console.log('Connected to DB')

}

module.exports = connectDB 