require('dotenv').config()
const app = require('./src/app')
const PORT = 3000
const connectDB = require('./src/config/db')

connectDB();

// // Test route

// app.get('/', (req,res)=>{
//     res.send("Todo API is running")
// })

// Start server

app.listen(PORT, ()=>{
    console.log(`Server Running on Port ${PORT}`)
})