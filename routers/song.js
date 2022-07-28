const express = require('express')
const bodyParser = require('body-parser')
const SongModel = require('../models/song')

const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()

const songRouter = express.Router()

songRouter.use(urlencodedParser)
songRouter.use(jsonParser)

songRouter.post('/', (req, res) => {
    var title = req.body.title
    var artist = req.body.artist
    var genre = req.body.genre
    var thumbnail = req.body.thumbnail
    var src = req.body.src
    SongModel.findOne({
            title: title,
        })
        .then(data => {
            if (data) {
                res.json({
                    message: 'Đã tồn tại',
                    data: data
                })
            } else {
                SongModel.create({
                        title: title,
                        artist: artist,
                        genre: genre,
                        thumbnail: thumbnail,
                        src: src
                    })
                    .then(data => {
                        res.json({
                            message: 'Thành công',
                            data: data
                        })
                    })
                    .catch(err => {
                        res.json({
                            message: 'Lỗi !',
                            err: err
                        })
                    })
            }
        })
        .catch(err => {
            if (err) {
                SongModel.create({
                        title: title,
                        artist: artist,
                        genre: genre,
                        thumbnail: thumbnail,
                        src: src
                    })
                    .then(data => {
                        res.json({
                            message: 'Chưa có dữ liệu, tạo mới thành công',
                            data: data
                        })
                    })
                    .catch(err => {
                        res.json({
                            message: 'Lỗi !',
                            err: err
                        })
                    })
            }
        })
})

songRouter.get('/', (req, res) => {
    SongModel.find()
        .then(data => {
            res.json({
                message: 'Thành công',
                data: data
            })
        })
        .catch(err => {
            res.json({
                message: 'Lỗi !',
                err: err
            })
        })
})
songRouter.get('/:id', (req, res) => {
    SongModel.findById(req.params.id)
        .then(data => {
            res.json({
                message: 'Thành công',
                data: data
            })
        })
        .catch(err => {
            res.json({
                message: 'Lỗi !',
                err: err
            })
        })
})
songRouter.delete('/:id', (req, res) => {
    SongModel.findByIdAndDelete(req.params.id)
        .then(data => {
            res.json({
                message: 'Thành công',
                data: data
            })
        })
        .catch(err => {
            res.json({
                message: 'Lỗi !',
                err: err
            })
        })
})

songRouter.put('/:id', (req, res) => {
    var title = req.body.title
    var artist = req.body.artist
    var genre = req.body.genre
    var thumbnail = req.body.thumbnail
    var src = req.body.src
    SongModel.findOne({ title: title })
        .then(data => {
            if (data) {
                res.json({
                    message: 'Đã tồn tại',
                    data: data
                })
            } else {
                SongModel.findByIdAndUpdate(req.params.id, {
                        title: title,
                        artist: artist,
                        genre: genre,
                        thumbnail: thumbnail,
                        src: src
                    })
                    .then(data => {
                        res.json({
                            message: 'Thành công',
                            data: data
                        })
                    })
                    .catch(err => {
                        res.json({
                            message: 'Lỗi !',
                            err: err
                        })
                    })
            }
        })
        .catch(err => {
            res.json({
                message: 'Lỗi !',
                err: err
            })
        })
})
module.exports = songRouter