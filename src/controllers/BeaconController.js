const db = require("../db")

class BeaconController {
    constructor() {
        this.model = db.getModel("Beacon")
    }

    async updateLastSeen(dkey) {
        await this.model.updateOne(
            { deviceKey: dkey },
            {
                device_key: dkey,
                lastSeenDate: new Date()
            },
            {
                upsert: true,
                setDefaultsOnInsert: true
            }
        )
    }

    async getAll() {
        return this.model.find().lean()
    }

    async getByDeviceKey(deviceKey) {
        return this.model.findOne({ deviceKey }).lean()
    }
}

module.exports = new BeaconController()
