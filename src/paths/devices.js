const DeviceController = require('../controllers/DeviceController')

module.exports = {
    get: async (req, res) => {
        const devices = await DeviceController.getAllDevices()
        res.json(devices)
    }
}