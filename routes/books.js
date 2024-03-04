const express = require('express')
const routerBooks = express.Router()
const Book = require('../models/Book')

const {requiredScopes} = require('express-oauth2-jwt-bearer')

routerBooks.get('/', requiredScopes('read:books'), async (req, res) => {
    try{
        const books = await Book.find()
        res.json(books)
    } catch(err){
        res.status(500).json({
            message: err.message || "Error getting books",
        })
    }
})

routerBooks.get('/:id', requiredScopes('read:books'), async (req, res) => {
    try{
        const books = await Book.findById(req.params.id)
        res.json(books)
    } catch(err){
        res.status(500).json({
            message: err.message || "Error getting books",
        })
    }
})

routerBooks.post('/', requiredScopes('write:books'),async (req, res) => {
    try{
        const book = new Book(req.body)
        await book.save()
        res.json(book)
    } catch(err){
        res.status(500).json({
            message: err.message || "Error creating book",
        })
    }
})

routerBooks.put('/:id', requiredScopes('write:books'),async (req, res) => {
    try{
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(book)
    } catch(err){
        res.status(500).json({
            message: err.message || "Error updating book",
        })
    }
})

routerBooks.delete('/:id', requiredScopes('write:books'),async (req, res) => {
    try{
        const book = await Book.findByIdAndDelete(req.params.id)
        res.json(book)
    } catch(err){
        res.status(500).json({
            message: err.message || "Error deleting book",
        })
    }
})

module.exports = routerBooks