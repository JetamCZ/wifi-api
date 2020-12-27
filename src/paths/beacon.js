const BeaconController = require('../controllers/BeaconController')
const MeetController = require('../controllers/MeetController')

module.exports = {
    post: async (req, res) => {
        const devices = req.body.devices.map(dev => {
            dev.mac = dev.mac.toLowerCase()
            return dev
        })

        for (let i = 0; i < req.body.devices.length; i++) {
            await MeetController.saveMeet(req.body.device_key, devices[i].mac, devices[i].rssi)
        }
        
        await BeaconController.updateLastSeen(req.body.device_key)

        res.status(202).send()
    }
}