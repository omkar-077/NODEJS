const musicModel = require('../models/music.model')
const jwt = require('jsonwebtoken');
const { uploadFile } = require('../services/storage.service')
const albumModel = require('../models/album.model')

async function createMusic(req, res) {
    //  console.log("req.cookies =", req.cookies);
    // console.log("req.headers.cookie =", req.headers.cookie);
    // console.log("req.body =", req.body);
    // console.log("req.file =", req.file);
    // console.log(req.cookies);

  //  changes due to middleware common things are taken out in middleware

    // const token = req.cookies.token;
    // if (!token) {
    //     return res.status(401).json({
    //         message: "Unathorized"
    //     })
    // }

    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET)
    //     if (decoded.role != "artist") {
    //         return res.status(403).json({
    //             message: "You Dont have access to create music"
    //         })
    //     }


        const { title } = req.body;
        const file = req.file;

        const result = await uploadFile(file.buffer.toString('base64'))
        console.log("ImageKit Result:", result);
        const music = await musicModel.create({
            uri: result.url,
            title,
            // artist: decoded.id   [change after addng middleware]
            artist: req.user.id
        })

        console.log(result);

        res.status(201).json({
            message: "Music Created Successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist
            }
        })
    // } catch (err) {
    //     console.log(err)
    //     return res.status(401).json({
    //         message: "Unauthorized"
    //     })


    // }
}

async function createAlbum(req,res){
    // const token = req.cookies.token;
    // if (!token) {
    //     return res.status(401).json({
    //         message: "Unathorized"
    //     })
    // }

    // try{
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET)
    //     if (decoded.role !== "artist"){
    //         return res.status(403).json({
    //             message: "You dont have access to create album"
    //         })
    //     }

        const { title, musics } = req.body;
        const album = await albumModel.create({
            title,
            // artist: decoded.id,
            artist: req.user.id,
            musics: musics
        })

        res.status(201).json({
            message: "Album created successfully",
            album:{
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics
            }
        })

    // }catch(err){
    //     console.log(err);
    //     return res.status(401).json({
    //         message: "Unathorized"
    //     })
    // }

}
module.exports = { createMusic, createAlbum };