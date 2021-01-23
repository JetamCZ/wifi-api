require("dotenv").config()
const db = require("../db")
const waldoPlan = require("../consts/waldoPlan")

class LocalizationController {
    constructor() {
        this.model = db.getModel("Localization")
    }

    async create(organizationId, localization) {
        const newLocalization = await new this.model({
            ...localization,
            organizationId
        }).save()

        return await this.model.findById(newLocalization._id).lean()
    }

    async getOrgAll(organizationId) {
        return await this.model.find({ organizationId }).lean()
    }

    async getById(id) {
        return await this.model.findById(id).lean()
    }

    async _getMeets(beaconsIds, devicesMacs) {
        const meetModel = db.getModel("Meet")

        let extDate = new Date()
        extDate = extDate.setSeconds(extDate.getSeconds() - process.env.LOCALIZATION_INTERESTING_SEC)

        if (beaconsIds) {
            if (devicesMacs) {
                return await meetModel.find({
                    deviceKey: { $in: beaconsIds },
                    mac: { $in: devicesMacs },
                    date: { $gt: extDate }
                })
            } else {
                return await meetModel.find({
                    deviceKey: { $in: beaconsIds },
                    date: { $gt: extDate }
                })
            }
        } else {
            if (devicesMacs) {
                return await meetModel.find({
                    mac: { $in: devicesMacs },
                    date: { $gt: extDate }
                })
            } else {
                return await meetModel.find({ date: { $gt: extDate } })
            }
        }
    }

    async changeBeaconPositions(localizationId, beacons) {
        const localization = await this.getById(localizationId)

        localization.beacons.forEach((b) => {
            const changed = beacons.find((be) => be.deviceKey === b.deviceKey)

            if (changed) {
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

        meets.forEach((meet) => {
            delete meet.mac

            if (devices[meet.mac]) {
                devices[meet.mac].meets.push(meet)
            } else {
                devices[meet.mac] = {
                    meets: []
                }
                devices[meet.mac].meets.push(meet)
            }
        })

        for (const [key, value] of Object.entries(devices)) {
            value.meets = value.meets.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1))

            value.lastSeenDate = meets[0].date
        }

        return devices
    }

    async saveFingerPrint(localizationId, print) {
        const fingerprintModel = db.getModel("Fingerprint")

        const newprint = await new fingerprintModel({
            ...print,
            localizationId
        }).save()

        return await fingerprintModel.findById(newprint._id).lean()
    }

    async getByPlan(id) {
        return await this.model.find({ planId: id }).lean()
    }

    async delete(localizationId) {
        const fingerprintModel = db.getModel("Fingerprint")

        await fingerprintModel.deleteMany({ localizationId })

        await this.model.findByIdAndRemove(localizationId)
    }

    async populatePlan(localization) {
        if (localization.planId === "waldo") {
            localization.plan = waldoPlan
        } else {
            localization.plan = await PlanController.getById(localization.planId)
        }

        delete localization.planId

        return localization
    }

    async populateBeacons(localization) {
        const beacons = await OrganizationController.getOrgBeacons(localization.organizationId)

        for (let i = 0; i < localization.beacons.length; i++) {
            const locBeacon = localization.beacons[i]

            const beacon = beacons.find((b) => {
                return b.deviceKey === locBeacon.deviceKey
            })

            locBeacon.name = beacon ? beacon.name : ""
            locBeacon.desc = beacon ? beacon.desc : ""
            locBeacon.lastSeenDate = beacon ? beacon.lastSeenDate : ""
        }

        return localization
    }

    async getLocalizationDevicesData(localization, beaconIds) {
        if (process.env.FILTER_ONLY_ORG_DEVICES) {
            const devices = (await DeviceController.getOrgDevices(localization.organizationId)).map(
                (device) => device.mac
            )
            return await this.locationData(beaconIds, devices)
        }

        return await this.locationData(beaconIds)
    }

    async populateDeviceNames(localization) {
        for (const device of localization.devices) {
            device.name = (await DeviceController.getDeviceByMac(device.mac))?.name || ""
        }

        return localization
    }

    async localize(localization) {
        const startTime = new Date()

        //setDefaults
        localization.devices = []
        localization.customLocalizationData = {
            caclulatingTimes: {
                total: 0
            }
        }

        //populate data
        localization = await this.populatePlan(localization)
        localization.customLocalizationData.caclulatingTimes.populatePlan =
            new Date() - startTime - localization.customLocalizationData.caclulatingTimes.total
        localization.customLocalizationData.caclulatingTimes.total = new Date() - startTime
        localization = await this.populateBeacons(localization)
        localization.customLocalizationData.caclulatingTimes.populateBeacons =
            new Date() - startTime - localization.customLocalizationData.caclulatingTimes.total
        localization.customLocalizationData.caclulatingTimes.total = new Date() - startTime

        const beaconIds = localization.beacons.map((beacon) => beacon.deviceKey)
        let localizationDevices = await this.getLocalizationDevicesData(localization, beaconIds)

        localization.customLocalizationData.caclulatingTimes.getDeviceData =
            new Date() - startTime - localization.customLocalizationData.caclulatingTimes.total
        localization.customLocalizationData.caclulatingTimes.total = new Date() - startTime

        switch (localization.type) {
            case "NEAREST_FINGERPRINT":
                localization.devices = await NearestFingerPrint.localize(localization._id, localizationDevices)
                //localization.customLocalizationData = {devicesDebugData: localizationDevices}
                break
            default:
                break
        }

        localization.customLocalizationData.caclulatingTimes.fingerPrinting =
            new Date() - startTime - localization.customLocalizationData.caclulatingTimes.total
        localization.customLocalizationData.caclulatingTimes.total = new Date() - startTime

        //populate geted data
        localization = await this.populateDeviceNames(localization)

        localization.customLocalizationData.caclulatingTimes.populateDeviceNames =
            new Date() - startTime - localization.customLocalizationData.caclulatingTimes.total
        localization.customLocalizationData.caclulatingTimes.total = new Date() - startTime

        return localization
    }

    async localizeAll(socket) {
        const localizations = await this.model.find().lean()

        for (let i = 0; i < localizations.length; i++) {
            const localization = await this.localize(localizations[i])

            socket.emit("localization-update", {
                secretToken: process.env.COMPUTING_NODE_TOKEN,
                localization
            })

            await CacheController.store("loc." + localization.organizationId + "." + localization._id, localization)
        }
    }
}

const PlanController = require("./PlanController")
const OrganizationController = require("./OrganizationController")
const DeviceController = require("./DeviceController")
const CacheController = require("./CacheController")
const BeaconController = require("./BeaconController")
const NearestFingerPrint = require("./LocalizationControllers/NearestFingerPrint")

module.exports = new LocalizationController()
