const express = require('express')
const ZingMp3 = require("zingmp3-api-full")

const apiRouters = express.Router()
apiRouters.get('/home/:page', (req, res) => {
    ZingMp3.getHome(req.params.page)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({ err: err })
        })
})

apiRouters.get('/chart', (req, res) => {
    ZingMp3.getChartHome()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({ err: err })
        })
})

apiRouters.get('/artist/:name', (req, res) => {
    ZingMp3.getArtist(req.params.name)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({ err: err })
        })
})

apiRouters.get('/top100', (req, res) => {
    ZingMp3.getTop100()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({ err: err })
        })
})

apiRouters.get('/playlist/:id', (req, res) => {
    ZingMp3.getDetailPlaylist(req.params.id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({ err: err })
        })
})

apiRouters.get('/song/:id', (req, res) => {
    ZingMp3.getSong(req.params.id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({ err: err })
        })
})

apiRouters.get('/infosong/:id', (req, res) => {
    ZingMp3.getInfoSong(req.params.id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({ err: err })
        })
})

apiRouters.get('/video/:id', (req, res) => {
    ZingMp3.getVideo(req.params.id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({ err: err })
        })
})
apiRouters.get('/category/:id', (req, res) => {
    ZingMp3.getCategoryMV(req.params.id)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({ err: err })
        })
})
apiRouters.get('/listmv/:id/:page/:count', (req, res) => {
    ZingMp3.getListMV(req.params.id, req.params.page, req.params.count)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({ err: err })
        })
})

apiRouters.get('/search/:keyword', (req, res) => {
    ZingMp3.search(req.params.keyword)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({ err: err })
        })
})
module.exports = apiRouters