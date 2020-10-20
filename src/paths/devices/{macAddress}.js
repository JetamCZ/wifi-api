const DeviceController = require('../../controllers/DeviceController')

module.exports = {
    get: async (req, res) => {
        const device = await DeviceController.getByMac(req.params.macAddress)

        res.json(device);
    }
}