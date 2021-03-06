const db = require("../db")

class DeviceController {
    constructor() {
        this.model = db.getModel("UserDevice")
    }

    async getLastActivity(mac) {
        const meetModel = db.getModel("Meet")
        const meets = await meetModel.find({ mac }).sort({ date: -1 }).lean()

        return meets[0]?.date || null
    }

    async getDeviceById(id) {
        return await this.model.findById(id).lean()
    }

    async getDeviceByMac(mac, organizationId) {
        return await this.model.findOne({ mac, organizationId }).lean()
    }

    async deleteByID(id) {
        return await this.model.findByIdAndRemove(id)
    }

    async getOrgDevices(organizationId) {
        return await this.model.find({ organizationId }).lean()
    }
}
const BeaconController = require("../controllers/BeaconController")

module.exports = new DeviceController()
