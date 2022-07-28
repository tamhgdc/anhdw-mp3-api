const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MONGODB_URI = 'mongodb+srv://zingmp3:anhdw@cluster0.6bhsc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const MONGODB_URI1 = 'mongodb+srv://zingmp3:anhdw@cluster0.6bhsc.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI1, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const songSchema = new Schema({
    title: String,
    artist: String,
    genre: String,
    thumbnail: String,
    src: String,
}, {
    collection: 'Song'
})

const SongModel = mongoose.model('Song', songSchema)

module.exports = SongModel