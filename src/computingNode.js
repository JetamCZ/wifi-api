require("dotenv").config()
const crons = require("./utils/crons")
const uncaught = require("uncaught")
const io = require("socket.io-client")

console.log("Trying connect to:", "http://localhost:" + process.env.PORT)
const socket = io("ws://localhost:" + process.env.PORT)

socket.on("handshake", (d) => {
    //console.log(d)
})

uncaught.start()
uncaught.addListener(function (error) {
    console.error("Uncaught error or rejection: ", error.message)
})

crons.init(socket)
