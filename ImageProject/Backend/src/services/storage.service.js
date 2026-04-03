const { ImageKit } = require('@imagekit/nodejs');

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,    // imagekit - pass (Omkar@07)   [env ]
})

async function uploadfile(buffer){
    const result = await imagekit.files.upload({
        file: buffer.toString('base64'),
        fileName: 'image.jpg'
    })
    return result;
}

module.exports = uploadfile