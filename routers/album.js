const express = require('express')
const bodyParser = require('body-parser')
const AlbumModel = require('../models/album')
const res = require('express/lib/response')

const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()

const albumRouter = express.Router()

albumRouter.use(urlencodedParser)
albumRouter.use(jsonParser)

albumRouter.post('/', (req, res) => {
    var title = req.body.title
    var avata = req.body.avata
    var listSong = req.body.listSong
    AlbumModel.findOne({
            title: title,
        })
        .then(data => {
            if (data) {
                res.json({
                    message: 'Đã tồn tại',
                    data: data
                })
            } else {
                AlbumModel.create({
                        title: title,
                        avata: avata,
                        listSong: listSong
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
                AlbumModel.create({
                        title: title,
                        avata: avata,
                        listSong: listSong
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

albumRouter.get('/', (req, res) => {
    AlbumModel.find()
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
albumRouter.get('/:id', (req, res) => {
    AlbumModel.findById(req.params.id)
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
albumRouter.delete('/:id', (req, res) => {
    AlbumModel.findByIdAndDelete(req.params.id)
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
albumRouter.put('/:id', (req, res) => {
    var title = req.body.title
    var avata = req.body.avata
    var listSong = req.body.listSong
    AlbumModel.findOne({
            title: title,
        })
        .then(data => {
            if (data) {
                res.json({
                    message: 'Đã tồn tại',
                    data: data
                })
            } else {
                AlbumModel.findByIdAndUpdate(req.params.id, {
                        title: title,
                        avata: avata,
                        listSong: listSong
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
                AlbumModel.create({
                        title: title,
                        avata: avata,
                        listSong: listSong
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
module.exports = albumRouter