// npm init -y - initiating node application
// npm i express - installing express  package

// app.listen(3000) starting server

// express() instance of server , mostly stored in 'app'

const express = require('express')


const app = express()  // storing server in app variable 

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.get("/about",(req,res)=>{
    res.send("About Page")
})

app.listen(3000)