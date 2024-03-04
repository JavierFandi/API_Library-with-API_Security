const express = require('express')
const {auth} = require('express-oauth2-jwt-bearer')
const routerBooks = require('./routes/books')
const errorHandler = require('./middlewares/errorHandler')

const autentication = auth({
    audience: 'http://localhost:3000/api/productos',
    issuerBaseURL: 'https://dev-utn-frc-iaew.auth0.com/',
    tokenSigningAlgorithm: 'RS256',
})

const app = express()
app.use(express.json())

app.use('/books', autentication, routerBooks)

app.use(errorHandler)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})