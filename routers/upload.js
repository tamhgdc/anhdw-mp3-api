const express = require('express')
const fileUpload = require('express-fileupload')
const uploadRouters = express.Router()
const path = require('path')
uploadRouters.use(express.static(path.join(__dirname, '../uploads')))

uploadRouters.use(fileUpload())

uploadRouters.post('/image', (req, res) => {
    if (req.files != undefined || req.files != null) {
        var img = req.files.myFile
        var path = '../ZingMp3API/uploads/image/' + img.name
        img.mv(path, (err) => {
            if (err) {
                console.log(err)
            } else {
                res.json({
                    message: 'Thành công',
                    data: img.name,
                    path: '/upload/image/' + img.name,
                })
            }

        })
    }
})
uploadRouters.post('/audio', (req, res) => {
    if (req.files != undefined || req.files != null) {
        var audio = req.files.myFile
        var path = '../ZingMp3API/uploads/audio/' + audio.name
        audio.mv(path, (err) => {
            if (err) {
                console.log(err)
            } else {
                res.json({
                    message: 'Thành công',
                    data: audio.name,
                    path: '/upload/audio/' + audio.name,
                })
            }

        })
    }
})
module.exports = uploadRouters