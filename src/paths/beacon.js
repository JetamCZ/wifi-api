const db = require('../db')
const DeviceController = require('../controllers/DeviceController')
const BeaconController = require('../controllers/BeaconController')

module.exports = {
    post: async (req, res) => {
        for (let i = 0; i < req.body.devices.length; i++) {
            await DeviceController.saveInfo(req.body.device_key, req.body.devices[i])
        }

        await BeaconController.updateLastSeen(req.body.device_key)

        res.status(202).send()
    }
}