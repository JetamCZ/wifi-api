const db = require('../../db')

class NearestFingerPrint {
    constructor() {
    }

    async _getFingerPrints(localizationId) {
        const model = db.getModel('Fingerprint')

        return await model.find({localizationId}).lean()
    }

    async localize(localizationId, localizationData) {
        const fingerPrints = await this._getFingerPrints(localizationId)

        const successfullyLocatedDevices = []

        for(const [key, value] of Object.entries(localizationData)) {
            console.log(key, value)
            successfullyLocatedDevices.push({
                mac: key,
                x: 0,
                y: 0,
                f: 0
            })
        }



        console.log(localizationData, fingerPrints)

        return successfullyLocatedDevices
    }
}

module.exports = new NearestFingerPrint()