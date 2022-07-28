const express = require('express')
const bodyParser = require('body-parser')
const GenreModel = require('../models/genre')

const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()

const genreRouters = express.Router()

genreRouters.use(urlencodedParser)
genreRouters.use(jsonParser)

genreRouters.post('/', (req, res) => {
    var genre = req.body.genre
    GenreModel.findOne({
            genre: genre
        })
        .then(data => {
            if (data) {
                res.json({
                    message: 'Đã tồn tại',
                    data: data
                })
            } else {
                GenreModel.create({
                        genre: genre
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
                GenreModel.create({
                        genre: genre
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
genreRouters.get('/', (req, res) => {
    GenreModel.find({})
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
genreRouters.get('/:id', (req, res) => {
    GenreModel.findById(req.params.id)
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
genreRouters.delete('/:id', (req, res) => {
    var id = req.params.id
    GenreModel.findByIdAndRemove(id)
        .then(data => {
            res.json({
                message: 'Xóa thành công',
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
genreRouters.put('/:id', (req, res) => {
    var id = req.params.id
    var genre = req.body.genre
    GenreModel.findOne({ genre: genre })
        .then(data => {
            if (data) {
                res.json({
                    message: 'Đã tồn tại',
                    data: data
                })
            } else {
                GenreModel.findByIdAndUpdate(id, {
                        genre: genre
                    })
                    .then(data => {
                        res.json({
                            message: 'Xóa thành công',
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

module.exports = genreRouters