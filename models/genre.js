const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MONGODB_URI = 'mongodb+srv://zingmp3:anhdw@cluster0.6bhsc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const MONGODB_URI1 = 'mongodb+srv://zingmp3:anhdw@cluster0.6bhsc.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI1, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const genreSchema = new Schema({
    genre: String,
}, {
    collection: 'Gende'
})

const GenreModel = mongoose.model('Gende', genreSchema)

module.exports = GenreModel