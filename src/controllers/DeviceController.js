const db = require('../db')

class DeviceController {
    constructor() {
        this.model = db.getModel('Device')
    }

    async saveInfo(dKey, device) {
        let deviceSave = await this.model.findOneAndUpdate({mac: device.mac}, {
            name: device.name,
            mac: device.mac,
            lastSeenDate: new Date(),
        }, {
            upsert: true,
            setDefaultsOnInsert: true,
        }).lean()

        await db.getModel('LastSeen').updateOne({mac: device.mac, deviceKey: dKey}, {
            deviceId: deviceSave._id,
            date: new Date(),
            rssi: device.rssi,
            deviceKey: dKey,
        }, {upsert: true, setDefaultsOnInsert: true})
    }

    async getAllDevices() {
        const devices = await this.model.find()


        return devices;
    }
}

module.exports = new DeviceController()