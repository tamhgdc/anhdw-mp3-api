const express = require('express')
const path = require('path')
const apiRouters = require('./routers/api')
const authRouters = require('./routers/auth')
const favoriteRouters = require('./routers/favorite')
const genreRouters = require('./routers/genre')
const uploadRouters = require('./routers/upload')
const artistRouters = require('./routers/artist')
const songRouters = require('./routers/song')
const albumRouters = require('./routers/album')
const app = express()
const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, './frontend')))

app.use('/api', apiRouters)
app.use('/auth', authRouters)
app.use('/favorite', favoriteRouters)
app.use('/genre', genreRouters)
app.use('/upload', uploadRouters)
app.use('/artist', artistRouters)
app.use('/song', songRouters)
app.use('/album', albumRouters)

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/frontend/admin.html')
})
app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html')
})

app.listen(port, () => {
    console.log('server is running...')
})