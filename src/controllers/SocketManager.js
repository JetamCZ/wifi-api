require('dotenv').config()
const socketIo = require('socket.io')

class SocketManager {
    constructor() {
        this.activeBeacons = {}
    }

    init(httpServer) {
        const io = socketIo(httpServer)

        io.on('connection', socket => {
            socket.emit('handshake', 'Welcome')

            socket.on('auth', auth => {
                if(auth.deviceKey) {
                    this.activeBeacons[socket.id] = auth.deviceKey
                    console.log('auth', socket.id, auth, this.activeBeacons)
                }
            })

            socket.on('data', data => {
                const key = this.activeBeacons[socket.id]
                if(key) {
                    DeviceController.saveInfo(key, {
                        rssi: data.rssi,
                        mac: data.mac,
                        name: data.name
                    })

                    BeaconController.updateLastSeen(key)
                }
            })

            socket.on('disconnect', (reason) => {
                delete this.activeBeacons[socket.id]
                console.log('auth', this.activeBeacons)
            });
        });
    }

}
const DeviceController = require('./DeviceController')
const BeaconController = require('./BeaconController')

module.exports = new SocketManager()