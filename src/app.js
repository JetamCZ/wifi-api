require('dotenv').config()
const { initialize } = require('express-openapi');
const swaggerUI = require('swagger-ui-express')
const express = require('express')
const path = require('path')

const db = require('./db/index')
db.init()

const swaggerDoc = require('./swagger')

const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded());
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

app.use((req, res, next) => {
    console.log(req.method, req.path, req.body)

    next();
})

initialize({
    app: app,
    paths: path.join(__dirname, './paths'),
    apiDoc: path.join(__dirname, 'swagger.js'),
    validateApiDoc: false
})

app.listen(port, () => {
    console.log(`HTTP server listening at http://localhost:${port}`)
})