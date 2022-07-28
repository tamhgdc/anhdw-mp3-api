const express = require('express')
const bodyParser = require('body-parser')
const FavoriteModel = require('../models/favorite')

const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()

const favoriteRouters = express.Router()

favoriteRouters.use(urlencodedParser)
favoriteRouters.use(jsonParser)


favoriteRouters.post('/', (req, res) => {
    var id = req.body.id
    var user = req.body.user
    var songList = []

    FavoriteModel.findOne({ id: id })
        .then(data => {
            if (data) {
                res.json(data)
            } else {
                FavoriteModel.create({ id: id, songList: songList })
                    .then(data => {
                        res.json('thành công')
                    }).catch(err => {
                        console.log('lỗi')
                        res.json(err)
                    })
            }
        }).catch(err => {
            res.json({
                message: 'Lỗi !',
                err: err
            })
        })
})

favoriteRouters.get('/', (req, res) => {
    FavoriteModel.find({})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
})
favoriteRouters.get('/admin/:id', (req, res) => {
    FavoriteModel.findOne({ id: req.params.id })
        .then(data => {
            if (data.id === '114900567395828562707') {
                FavoriteModel.find({})
                    .then(data => {
                        res.json({
                            message: 'Xin chào, Admin',
                            data: data
                        })
                    })
                    .catch(err => {
                        res.json(err)
                    })
            } else {
                res.json({
                    message: 'Không phải admin'
                })
            }

        })
        .catch(err => {
            res.json(err)
        })
})
favoriteRouters.put('/:id', (req, res) => {
    FavoriteModel.findOneAndUpdate({ id: req.params.id }, { songList: req.body.songList }, )
        .then(data => {
            res.json(data)
        }).catch(err => {
            res.json(err)
        })
})

favoriteRouters.get('/:id', (req, res) => {
    FavoriteModel.findOne({ id: req.params.id })
        .then(data => {
            res.json(data)
        }).catch(err => {
            res.json(err)
        })
})
module.exports = favoriteRouters