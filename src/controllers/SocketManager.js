require("dotenv").config()
const socketIo = require("socket.io")
const jwt = require("jsonwebtoken")
const LocalizationController = require("./LocalizationController")

class SocketManager {
    constructor() {
        this.activeBeacons = {}
    }

    init(httpServer) {
        const io = socketIo(httpServer, {
            transport: ["websocket"],
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        })

        console.log("SOCKET server started")

        io.on("connection", async (socket) => {
            socket.emit("handshake", "Welcome")

            socket.on("auth", async (auth) => {
                let userData = {}

                try {
                    userData = jwt.verify(auth.token, process.env.JWT_TOKEN)
                } catch (err) {
                    console.log(err)
                    socket.emit("err", "Cannot verify your token")
                }

                const localization = await LocalizationController.getById(auth.localizationId)

                if (localization && localization.organizationId === userData.organization._id) {
                    socket.emit("success", "User verified")
                    socket.join(localization._id)
                } else {
                    socket.emit("err", "Cannot verify your token")
                }
            })

            socket.on("localization-update", async (data) => {
                if (data.secretToken === process.env.COMPUTING_NODE_TOKEN && data.localization) {
                    socket.emit("success", "Computing server verified")
                    io.to(data.localization._id).emit("update", data.localization)
                }
            })

            socket.on("disconnect", (reason) => {})
        })
    }
}

module.exports = new SocketManager()
