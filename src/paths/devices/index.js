const OrganizationController = require("../../controllers/OrganizationController")
const UserController = require("../../controllers/UserController")
const DeviceController = require("../../controllers/DeviceController")

module.exports = {
    post: async (req, res) => {
        try {
            const device = await UserController.addDevice(
                req.user.organization._id,
                req.body.userId,
                req.body.mac,
                req.body.name
            )
            res.json(device)
        } catch (e) {
            res.status(400).json(e.message)
        }
    },
    get: async (req, res) => {
        const devices = await DeviceController.getOrgDevices(req.user.organization._id)

        for (let i = 0; i < devices.length; i++) {
            const user = await UserController.getUser(devices[i].userId)

            delete user.settings
            delete user.password
            delete user.organizationId

            devices[i].user = user
        }

        for (let y = 0; y < devices.length; y++) {
            devices[y].lastSeenDate = await DeviceController.getLastActivity(devices[y].mac)
        }

        res.json(devices)
    }
}
