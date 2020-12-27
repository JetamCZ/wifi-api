const db = require('../db')

class MeetController {
    constructor() {
        this.model = db.getModel('Meet')
    }

    async saveMeet(beaconDeviceKey, mac, rssi) {
        await this.model.updateOne({deviceKey: beaconDeviceKey, mac}, {
            date: new Date(),
            rssi: rssi,
            mac,
            deviceKey: beaconDeviceKey,
        }, {
            upsert: true,
            setDefaultsOnInsert: true
        })
    }
}

module.exports = new MeetController()