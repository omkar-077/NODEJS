// this file use to start server

// API (Application Programming Interface) - use for communication between frontend and backend

// REST API..
// GET - fetching data from server
// POST - send data to server
// PATCH - Update Data on server
// DELETE - Delete Data on server


// Ig1IntnrEiQTW4XU - pass

// mongodb+srv://Omkar:Ig1IntnrEiQTW4XU@basic.f6pxi1v.mongodb.net/

// TASK - user can create notes update and delete.

const app = require('./src/app')  // server require from app.js

app.listen(3000,()=>{     
    console.log('server running on port 3000')
})

// app.listen(3000) = starts server
// ()=>{ ....}  = callback 