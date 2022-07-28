const express = require('express')
const bodyParser = require('body-parser')
const ArtistModel = require('../models/artist')

const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()

const artistRouters = express.Router()
artistRouters.use(urlencodedParser)
artistRouters.use(jsonParser)

artistRouters.post('/', (req, res) => {
    var name = req.body.name
    var image = req.body.image
    ArtistModel.findOne({
            name: name
        })
        .then(data => {
            if (data) {
                res.json({
                    message: 'Nghệ sĩ đã tồn tại',
                    data: data
                })
            } else {
                ArtistModel.create({
                        name: name,
                        image: image,
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
                ArtistModel.create({
                        name: name,
                        image: image,
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

artistRouters.get('/', (req, res) => {
    ArtistModel.find({})
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

artistRouters.get('/:id', (req, res) => {
    ArtistModel.findById(req.params.id)
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

artistRouters.delete('/:id', (req, res) => {
    var id = req.params.id
    ArtistModel.findByIdAndDelete(id)
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

artistRouters.put('/:id', (req, res) => {
    var id = req.params.id
    var name = req.body.name
    var image = req.body.image
    ArtistModel.findOne({ name: name })
        .then(data => {
            if (data) {
                res.json({
                    message: 'Nghệ sĩ đã tồn tại',
                    data: data
                })
            } else {
                ArtistModel.findByIdAndUpdate(id, {
                        name: name,
                        image: image,
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
module.exports = artistRouters