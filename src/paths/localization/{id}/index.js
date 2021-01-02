const LocalizationController = require('../../../controllers/LocalizationController')
const PlanController = require('../../../controllers/PlanController')
const DeviceController = require('../../../controllers/DeviceController')
const OrganizationController = require('../../../controllers/OrganizationController')

module.exports = {
    get: async (req, res) => {
        const localization = await LocalizationController.getById(req.params.id)

        if(req.user.organization._id !== localization.organizationId) {
            res.status(403).send()
            return
        }

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

        if(process.env.FILTER_ONLY_ORG_DEVICES) {
            const devices = (await DeviceController.getOrgDevices(localization.organizationId)).map(device => device.mac)
            localization.devices = await LocalizationController.locationData(beaconIds, devices)
        } else {
            localization.devices = await LocalizationController.locationData(beaconIds)
        }

        res.json(localization)
    }
}