const LocalizationController = require('../../../controllers/LocalizationController')
const PlanController = require('../../../controllers/PlanController')
const DeviceController = require('../../../controllers/DeviceController')
const OrganizationController = require('../../../controllers/OrganizationController')
const NearestFingerPrint = require('../../../controllers/LocalizationControllers/NearestFingerPrint')

module.exports = {
    get: async (req, res) => {
        const localization = await LocalizationController.getById(req.params.id)

        //Check rights to view
        if(req.user.organization._id !== localization.organizationId) {
            res.status(403).send()
            return
        }

        //populate data
        localization.plan = await PlanController.getById(localization.planId)
        delete localization.planId

        for (let i = 0; i < localization.beacons.length; i++) {
            const locBeacon = localization.beacons[i]

            const beacon = await OrganizationController.getOrgBeaconByKey(locBeacon.deviceKey)

            locBeacon.name = beacon.name
            locBeacon.desc =  beacon.desc
            locBeacon.lastSeenDate =  beacon.lastSeenDate
        }

        const beaconIds = localization.beacons.map(beacon => beacon.deviceKey)

        //get devices data
        let localizationDevices = []

        if(process.env.FILTER_ONLY_ORG_DEVICES) {
            const devices = (await DeviceController.getOrgDevices(localization.organizationId)).map(device => device.mac)
            localizationDevices = await LocalizationController.locationData(beaconIds, devices)
        } else {
            localizationDevices = await LocalizationController.locationData(beaconIds)
        }

/*
        localization.customLocalizationData = {
            devicesDebugData: localizationDevices
        }

 */

        if(localization.type === "NEAREST_FINGERPRINT"){
            localization.devices = await NearestFingerPrint.localize(req.params.id, localizationDevices)
        }


        res.json(localization)
    }
}