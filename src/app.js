require('dotenv').config()
const { initialize } = require('express-openapi');
const swaggerUI = require('swagger-ui-express');
const express = require('express');
const path = require('path');
const cors = require('cors')
const CronJob = require('cron').CronJob;
const MeetController = require('./controllers/MeetController')
const http = require('http')
const SocketManager = require("./controllers/SocketManager")
const rateLimit = require("express-rate-limit");
const uncaught = require('uncaught');

uncaught.start();
uncaught.addListener(function (error) {
    console.error('Uncaught error or rejection: ', error.message);
});

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
    if(req.path === '/beacon') {
        if(process.env.LOG_BEACON_REQUESTS.toString() !== 'false') {
            console.log(req.method, req.path, process.env.LOG_REQESTS_BODY !== 'false' ? req.body : "-")
        }
    } else if(process.env.LOG_REQUESTS.toString() !== 'false') {
        console.log(req.method, req.path, process.env.LOG_REQESTS_BODY !== 'false' ? req.body : "-")
    }

    next();
})

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
});

app.use("/auth/login", apiLimiter);
app.use("/auth/register", apiLimiter);
app.use("/auth/create-org", apiLimiter);

app.use((req, res, next) => {
    req.token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : ""

    if(!req.path.includes('/auth') && req.path !== '/beacon') {
        if(req.token) {
            try {
                const data = jwt.verify(req.token, process.env.JWT_TOKEN)
                req.user = data
                next()
            } catch (err) {
                res.status(401).json({error: "TOKEN_VALIDATION", message: ""})
            }
        } else {
            res.status(401).json({error: "TOKEN_REQUIRED", message: ""})
        }
    } else {
        try {
            const data = jwt.verify(req.token, process.env.JWT_TOKEN)
            req.user = data
        } catch (err) {
        }
        next()
    }
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

//SocketManager.init(server)

server.listen(port, () => {
    console.log(`HTTP server listening at http://localhost:${port}`)
})

//Cron Every 5minutes
const clearOldDataJob = new CronJob('0 */5 * * * *', async () => {
    const date = new Date();
    date.setHours(date.getHours() - 1)
    await MeetController.cleanupBeforeDay(date);

}, null, true, 'Europe/Prague')

clearOldDataJob.start()
