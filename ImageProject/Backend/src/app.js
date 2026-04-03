const express = require('express')
const multer = require('multer')    // middleware 
const uploadfile = require('./services/storage.service')
const postModel = require('./models/post.models')
const cors = require('cors')
 

const app = express()
app.use(cors())
app.use(express.json())

const upload = multer({storage: multer.memoryStorage()})   // middleware

app.post('/create-post', upload.single('image'), async (req,res)=>{

    // console.log(req.body)
    // console.log(req.file)
    const result = await uploadfile(req.file.buffer)
    
    const post = await postModel.create({
        image: result.url,
        caption: req.body.caption
    })

    return res.status(201).json({
        message: "Post created Successfully",
        post
    })


})


app.get('/posts', async (req,res)=>{
    const posts = await postModel.find()
    return res.status(200).json({
        message: "Posts fetch Successfully",
        posts
    })
})

module.exports = app