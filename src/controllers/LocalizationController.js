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
                return await meetModel
                    .find({
                        deviceKey: { $in: beaconsIds },
                        mac: { $in: devicesMacs },
                        date: { $gt: extDate }
                    })
                    .lean()
            } else {
                return await meetModel
                    .find({
                        deviceKey: { $in: beaconsIds },
                        date: { $gt: extDate }
                    })
                    .lean()
            }
        } else {
            if (devicesMacs) {
                return await meetModel
                    .find({
                        mac: { $in: devicesMacs },
                        date: { $gt: extDate }
                    })
                    .lean()
            } else {
                return await meetModel.find({ date: { $gt: extDate } }).lean()
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

        for (const meet of meets) {
            if (!devices[meet.mac]) {
                devices[meet.mac] = { meets: [] }
            }

            devices[meet.mac].meets.push(meet)

            delete meet.mac
        }

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
            const dev = await DeviceController.getDeviceByMac(device.mac, localization.organizationId)
            device.name = dev?.name || ""
            device._id = dev?._id || ""
        }

        return localization
    }

    async populateRooms(localization) {
        localization.rooms = await RoomController.getByLocalizationId(localization._id)

        return localization
    }

    populateDevicesRooms(devices, rooms) {
        for (const device of devices) {
            device.rooms = RoomController.getRoomByPoint(
                rooms.filter((r) => r.f === device.f),
                [device.x, device.y]
            )
        }

        return devices
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
        localization = await this.populateBeacons(localization)
        localization = await this.populateRooms(localization)

        const beaconIds = localization.beacons.map((beacon) => beacon.deviceKey)
        let localizationDevices = await this.getLocalizationDevicesData(localization, beaconIds)

        switch (localization.type) {
            case "NEAREST_FINGERPRINT":
                const fingerPrintss = await NearestFingerPrint._getFingerPrints(localization._id)

                localization.customLocalizationData.fingerPrintsCount = fingerPrintss.length

                localization.devices = (await NearestFingerPrint.localize(localization._id, localizationDevices)) || []
                break
            case "TRILATERATION":

                localization.devices = (await Trilateration.localize(localization, localizationDevices)) || []
                break
            case "BRAIN":
                const fingerPrints = await NearestFingerPrint._getFingerPrints(localization._id)

                localization.customLocalizationData.fingerPrintsCount = fingerPrints.length

                if(localization.customLocalizationData.fingerPrintsCount <= 10) {
                    localization.devices = (await NearestFingerPrint.localize(localization._id, localizationDevices)) || []
                } else {
                    localization.devices = (await Brain.localize(localization._id, localizationDevices, fingerPrints)) || []
                }

                break
            default:
                break
        }

        //Get rooms
        localization.devices = this.populateDevicesRooms(localization.devices, localization.rooms)

        //populate geted data
        localization = await this.populateDeviceNames(localization)

        localization.customLocalizationData.caclulatingTimes.total = new Date() - startTime
        localization.customLocalizationData.caclulatingTimes.date = new Date()

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

            //const oldCache = await CacheController.get("loc." + localization.organizationId + "." + localization._id)
        }
    }

    async getLocalizaionsOverallInfo(orgId) {
        const modelCache = db.getModel("Cache")
        return modelCache.find({"data.organizationId": orgId}).lean()
    }
}

const PlanController = require("./PlanController")
const OrganizationController = require("./OrganizationController")
const DeviceController = require("./DeviceController")
const CacheController = require("./CacheController")
const RoomController = require("./RoomController")
const NearestFingerPrint = require("./LocalizationControllers/NearestFingerPrint")
const Trilateration = require("./LocalizationControllers/Trilateration")
const Brain = require("./LocalizationControllers/Brain")

module.exports = new LocalizationController()
