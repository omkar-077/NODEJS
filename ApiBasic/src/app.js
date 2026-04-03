// Only work of this file is to create server

const express = require('express')

const app = express()

app.use(express.json())  // middleware , by default express cannot read data that come from postman in raw format

const notes = []      // array

// notes - title, description 

// in this task postman will work as frontend 

// post -data comes from frontend to server
app.post('/notes', (req, res) =>{
    notes.push(req.body)
    res.status(201).json({
        message: "node created successfully"
    })
})


// get - data going from server tp frontend 
app.get('/notes', (req, res) =>{
   
    res.status(200).json({
        message: "node fetch successfully",
        notes: notes
    })
})


// Dymanic part in routes is consider as params
// Delete 
// static : Dynamic
app.delete('/notes/:index', (req,res)=>{
    const index = req.params.index   //taking out index
    delete notes [index]
    res.status(200).json({
        message : "note deleted successfully"
    })
})

// update 
app.patch('/notes/:index', (req,res)=>{
    const index = req.params.index
    const description = req.body.description

    notes[index].description = description
    res.status(200).json({
        message: "note updated successfully "
    })
})

module.exports = app 