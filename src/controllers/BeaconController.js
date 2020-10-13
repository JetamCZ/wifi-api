const db = require('../db')

class BeaconController {
    constructor() {
        this.model = db.getModel('Beacon')
    }

    async updateLastSeen(dkey) {
        await this.model.updateOne({deviceKey: dkey}, {
            device_key: dkey,
            lastSeenDate: new Date()
        },{
            upsert: true,
            setDefaultsOnInsert: true
        })
    }

}

module.exports = new BeaconController()