const jwt = require('jsonwebtoken')

async function authArtist(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unathorized"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (decoded.role != "artist") {
            return res.status(403).json({
                message: "You Dont have access "
            })
        }

        req.user = decoded;

        next()

    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message: "Unathorized"
        })
    }
}

module.exports = { authArtist }