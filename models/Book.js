const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Library')

const BookSchema = new mongoose.Schema({
    id : {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
}, {collection: 'Books'})

const Book = mongoose.model('Book', BookSchema)

module.exports = Book