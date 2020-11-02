require('dotenv').config()
const { initialize } = require('express-openapi');
const swaggerUI = require('swagger-ui-express');
const express = require('express');
const path = require('path');
var cors = require('cors')
const CronJob = require('cron').CronJob;
const DeviceController = require('./controllers/DeviceController')
const http = require('http')
const SocketManager = require("./controllers/SocketManager")

const db = require('./db/index')
db.init()

const swaggerDoc = require('./swagger')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded());
app.use(express.json());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

app.use((req, res, next) => {
    if(process.env.ENVIRONMENT === 'local') {
        console.log(req.method, req.path, req.body)
    }

    next();
})

initialize({
    app: app,
    paths: path.join(__dirname, './paths'),
    apiDoc: path.join(__dirname, 'swagger.js'),
    validateApiDoc: false
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
