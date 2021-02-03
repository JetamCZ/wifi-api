const DeviceController = require("../../controllers/DeviceController")
const LocalizationController = require("../../controllers/LocalizationController")
const UserController = require("../../controllers/UserController")
const OrganizationController = require("../../controllers/OrganizationController")

module.exports = {
    get: async (req, res) => {
        const device = await DeviceController.getDeviceById(req.params.id)

        if (req.user.organization._id !== device.organizationId) {
            res.status(403).send()
            return
        }

        const meets = await LocalizationController._getMeets(null, device.mac)
        const deviceMeets = []

        for(const meet of meets) {
            const m = await OrganizationController.getOrgBeaconByKey(meet.deviceKey, device.organizationId)
            m.rssi = meet.rssi
            deviceMeets.push(m)
        }

        device.meets = deviceMeets

        const user = await UserController.getUser(device.userId)
        device.user = {
            name: user.name,
            email: user.email
        }

        res.json(device)
    },
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
