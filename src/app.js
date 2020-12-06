require('dotenv').config()
const { initialize } = require('express-openapi');
const swaggerUI = require('swagger-ui-express');
const express = require('express');
const path = require('path');
const cors = require('cors')
const CronJob = require('cron').CronJob;
const DeviceController = require('./controllers/DeviceController')
const http = require('http')
const SocketManager = require("./controllers/SocketManager")

const jwt = require('jsonwebtoken')

const db = require('./db/index')

const swaggerDoc = require('./swagger')

const app = express()
const port = process.env.PORT || 3000

app.use(cors({
    credentials: true
}))
app.use(express.urlencoded());
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

app.use((req, res, next) => {
    console.log(req.method, req.path, req.body)
    next();
})

app.use((req, res, next) => {
    req.token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : ""
    console.log(req.token)

    next()
})

app.get('/token', (req, res) => {
    const json = jwt.sign({
        user: {
            _id: "123456",
            username: "Matěj Půhoný",
        },
        organization: {
            name: "Delta SŠIE"
        }
    }, process.env.JWT_TOKEN)

    res.json(json)
})

initialize({
    app: app,
    paths: path.join(__dirname, './paths'),
    apiDoc: path.join(__dirname, 'swagger.js'),
    validateApiDoc: false,
    errorMiddleware: (err, req, res, next) => {
        res.status(err.status || 500).json({
            message: err.message,
            errors: err.errors,
        });
    }
})

const server = http.createServer(app)

SocketManager.init(server)

server.listen(port, () => {
    console.log(`HTTP server listening at http://localhost:${port}`)
})

const clearOldDataJob = new CronJob('0 */5 * * * *', async () => {
    const date = new Date();
    date.setHours(date.getHours() - 1)

    await DeviceController.cleanupBeforeDay(date);

}, null, true, 'Europe/Prague')

clearOldDataJob.start()
