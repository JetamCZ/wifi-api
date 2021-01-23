const BeaconController = require("../controllers/BeaconController")
const MeetController = require("../controllers/MeetController")

module.exports = {
    post: async (req, res) => {
        await BeaconController.updateLastSeen(req.body.device_key)

        const devices = req.body.devices.map((dev) => {
            dev.mac = dev.mac.toLowerCase()
            return dev
        })

        for (let i = 0; i < req.body.devices.length; i++) {
            await MeetController.saveMeet(req.body.device_key, devices[i].mac, devices[i].rssi)
        }

        res.status(202).send()
    }
}
