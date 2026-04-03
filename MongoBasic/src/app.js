const express = require('express')
const notemodel = require('./model/note.model')

const app = express()

// post= create a note , get= get all notes , patch= update notes, delete= delete notes
// post /notes, get /notes, patch /notes/:id, delete /notes/:id

app.use(express.json())  // middleware

app.post('/notes',async (req,res)=>{        // async await is used we dont how much time will  it take for data to go and return.
    const data = req.body
    await notemodel.create({    
        title: data.title,
        description: data.description        
    })

    res.status(201).json({
        message : "note created"
    })
})


app.get('/notes', async (req,res)=>{

    const notes = await notemodel.find()   // find() method is use t find all items created and store it in "array" (always) 

    // const notes = await notemodel.findOne({     findOne() method only find require note . in 'Object'  
    //     title : "title__1"
    // })   

    res.status(200).json({
        message: "Note fetch Successfully",
        notes: notes
    })
})


app.delete('/notes/:id', async(req,res)=>{
    const id = req.params.id
    await notemodel.findOneAndDelete({
        _id : id   // _id bcoz in data id is save in format - '"_id": "69c8ae0f565c7a484d5e52d6",'
    })

    res.status(200).json({
        message : "Note deleted Successfully"
    })
})


app.patch('/notes/:id', async (req,res)=>{
    const id = req.params.id
    const description = req.body.description
    await notemodel.findOneAndUpdate({_id : id},{description : description})  // 2 objects bcoz , on what basis we have to update and ehat to update

    res.status(200).json({
        message : "Note Updated Successfully"
    })
})

module.exports = app



// images are stored in cloud storage provider , then cloud storage provider provide URL and that URL is stored in database...  Ex- Image kit [free]