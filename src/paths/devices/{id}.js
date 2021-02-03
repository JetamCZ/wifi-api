const DeviceController = require("../../controllers/DeviceController")

module.exports = {
    /*
    get: async (req, res) => {
        const device = await DeviceController.getDeviceById(req.params.id)

        if (req.user.organization._id !== device.organizationId) {
            res.status(403).send()
            return
        }

        res.json(device)
    },
     */
    delete: async (req, res) => {
        const device = await DeviceController.getDeviceById(req.params.id)

        if (req.user.organization._id !== device.organizationId) {
            res.status(403).send()
            return
        }

        await DeviceController.deleteByID(req.params.id)

        res.json()
    }
}
