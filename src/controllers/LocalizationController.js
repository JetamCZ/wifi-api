const db = require('../db')

class LocalizationController {
   constructor() {
       this.model = db.getModel('Localization')
   }

   async create(organizationId, localization) {
       const newLocalization = await new this.model({
           ...localization,
           organizationId
       }).save()

       return await this.model.findById(newLocalization._id).lean()
   }

   async getOrgAll(organizationId) {
       return await this.model.find({organizationId}).lean()
   }

   async getById(id) {
       return await this.model.findById(id).lean()
   }

   async _getMeets(beaconsIds, devicesMacs) {
       const meetModel = db.getModel('Meet')

       let extDate = new Date()
       extDate = extDate.setSeconds(extDate.getSeconds() - process.env.LOCALIZATION_INTERESTING_SEC)

       if(beaconsIds) {
           if(devicesMacs) {
               return await meetModel.find({deviceKey: {$in: beaconsIds}, mac: {$in: devicesMacs}})
           } else {
               return await meetModel.find({deviceKey: {$in: beaconsIds}})
           }
       } else {
           if(devicesMacs) {
               return await meetModel.find({mac: {$in: devicesMacs}})
           } else {
               return await meetModel.find()
           }
       }
   }

   async changeBeaconPositions(localizationId, beacons) {
       const localization = await this.getById(localizationId)

        localization.beacons.forEach(b => {
            const changed = beacons.find(be => be.deviceKey === b.deviceKey)

            if(changed) {
                b.x = changed.x
                b.y = changed.y
                b.f = changed.f
            }
        })

       await this.model.findByIdAndUpdate(localizationId, localization)

       return localization
   }

   async locationData(beaconsIds, devicesMacs) {
       const meets = await this._getMeets(beaconsIds, devicesMacs)
       let devices = {}

       meets.forEach(meet => {
           delete meet.mac

           if(devices[meet.mac]) {
               devices[meet.mac].meets.push(meet)
           } else {
               devices[meet.mac] = {
                   meets: []
               }
               devices[meet.mac].meets.push(meet)
           }
       })

       for (const [key, value] of Object.entries(devices)) {
           value.meets = value.meets.sort((a, b) => (new Date(a.date) > new Date(b.date)) ? 1 : -1)

           value.lastSeenDate = meets[0].date
       }

       return devices
   }

   async saveFingerPrint(localizationId, print) {
        const fingerprintModel = db.getModel('Fingerprint')

       const newprint = await new fingerprintModel({
           ...print,
           localizationId
       }).save()

       return await fingerprintModel.findById(newprint._id).lean()
    }
}

module.exports = new LocalizationController()