const db = require("../db");
const CacheController = require("../controllers/CacheController");

class HistoryController {
    constructor() {
        this.beaconHistoryModel = db.getModel("HistoryBeacon")
        this.localizationDeviceHistoryModel = db.getModel("HistoryLocalizationDevice")
    }

    async mapBeacons() {
        this.orgBeaconModel = db.getModel("OrgBeacon")
        this.beaconModel = db.getModel("Beacon")

        const orgBeacons = await this.orgBeaconModel.find().lean()
        const beacons = await this.beaconModel.find().lean()

        const activityThreshold = new Date()
        activityThreshold.setSeconds(activityThreshold.getSeconds() - 30)

        for (const orgBeacon of orgBeacons) {
            const beaconActive = beacons.find(b => b.deviceKey === orgBeacon.deviceKey)?.lastSeenDate >= activityThreshold ?? false

            await this.saveStateBeacon(orgBeacon._id, beaconActive)
        }
    }

    async saveStateBeacon(orgBeaconId, online) {
        const lastHistory = await this.beaconHistoryModel.findOne({orgBeaconId}, {}, {sort: {"date": 1}}).lean()

        if ((!lastHistory && online) || (lastHistory?.active !== online)) {
            await new this.beaconHistoryModel({
                orgBeaconId,
                date: new Date(),
                active: online
            }).save()
        }
    }

    async mapLocalizations() {
        const localizationModel = db.getModel("Localization")

        const localizations = await localizationModel.find()

        for (const localization of localizations) {
            const cache = await CacheController.get("loc." + localization.organizationId + "." + localization._id, localization)

            if (!cache) {
                continue
            }

            const nD = new Date()
            nD.setMinutes(nD.getMinutes() - 5)

            const activeIds = await this.localizationDeviceHistoryModel.find({
                localizationId: localization._id,
                active: true,
                date: {$lt: nD}
            }).distinct('deviceId')
            const cachedDevicesIds = cache.devices.map(dev => dev._id.toString())
            const offlineDevicesIds = activeIds.filter(id => !cachedDevicesIds.includes(id))
            for (const deviceId of offlineDevicesIds) {
                await this.checkOfflineDevice(localization._id, deviceId)
            }

            for (const device of cache.devices) {
                await this.saveDeviceLoc(localization._id, device._id, true, device.rooms)
            }
        }
    }

    async checkOfflineDevice(localizationId, deviceId) {
        const lastHistory = await this.localizationDeviceHistoryModel.findOne({
            localizationId,
            deviceId
        }, {}, {sort: {"date": 1}}).lean()

        if (lastHistory.active) {
            new this.localizationDeviceHistoryModel({
                localizationId, deviceId, active: false, rooms: [], date: new Date()
            }).save()
        }
    }

    async saveDeviceLoc(localizationId, deviceId, active, rooms) {
        const lastHistory = await this.localizationDeviceHistoryModel.findOne({
            localizationId,
            deviceId
        }, {}, {sort: {"date": 1}}).lean()

        if ((!lastHistory) && active || (lastHistory?.active !== active) || (JSON.stringify(lastHistory?.rooms ?? []) !== JSON.stringify(rooms))) {
            new this.localizationDeviceHistoryModel({
                localizationId, deviceId, active, rooms: rooms, date: new Date()
            }).save()
        }
    }

    async getLocalizationHistory(localizationId, details = false) {
        const localizationsHistoryDevices = await this.localizationDeviceHistoryModel.find({localizationId}, [], {
            sort: {"date": 1}
        }).lean()

        this.localizationModel = db.getModel("Localization")
        const organizationId = (await this.localizationModel.findById(localizationId).lean()).organizationId

        const userDeviceModel = db.getModel("UserDevice")
        const orgDevices = await userDeviceModel.find({organizationId})

        const groups = {};
        for (const device of localizationsHistoryDevices) {
            if (!groups[device.deviceId]) {
                groups[device.deviceId]= {
                    deviceId: device.deviceId,
                    actions: []
                }
            }

            groups[device.deviceId].actions.push(device)
        }

        const res = []
        for (const [key, value] of Object.entries(groups)) {
            const device = {
                deviceId: value.deviceId,
                device: orgDevices.find(dev => dev._id.toString() === value.deviceId) ?? {},
                activities: []
            }

            const events = []
            let event = null
            for (const action of value.actions) {
                if(details && action.active) {
                    if(event) {
                        event.to = action.date
                        events.push({...event})
                        event = null
                    }

                    event = {
                        from: action.date,
                        rooms: action.rooms
                    }

                }
                if(!details && action.active && !event) {
                    event = {
                        from: action.date,
                    }
                }
                if(!action.active && event) {
                    event.to = action.date
                    events.push({...event})
                    event = null
                }
            }

            if(event) {
                event.to = new Date()
                events.push({...event})
            }

            device.activities = events

            res.push(device)
        }



        return res
    }

    async getOrgBeaconHistory(organizationId) {
        this.orgBeaconModel = db.getModel("OrgBeacon")

        const orgBeacons = await this.orgBeaconModel.find({organizationId}).lean()

        const history = await this.beaconHistoryModel.find({
            orgBeaconId: {$in: orgBeacons.map(b => b._id)}
        }, [], {
            sort: {"date": 1}
        }).lean()

        //groupBy
        const groups = {};
        for (const action of history) {
            if (!groups[action.orgBeaconId]) {
                groups[action.orgBeaconId] = {
                    beacon: orgBeacons.find(b => b._id.toString() === action.orgBeaconId) ?? {},
                    actions: []
                }
            }

            groups[action.orgBeaconId].actions.push(action)

            delete action._id
            delete action.orgBeaconId
        }

        for (const [key, value] of Object.entries(groups)) {
            const events = []
            let event = null

            for (const action of value.actions) {
                if (action.active && !event) {
                    event = {
                        from: action.date
                    }
                }
                if (!action.active && event) {
                    events.push({
                        ...event,
                        to: action.date
                    })
                    event = null
                }
            }
            if (event) {
                events.push({
                    ...event,
                    to: new Date()
                })
                event = null
            }

            value.activities = events
            delete value.actions
        }

        const result = Object.entries(groups).map((item) => {
            return {
                beacon: item[1].beacon,
                activities: item[1].activities
            }
        })

        return result
    }


    //TODO Remove old data (after 2 months)
}

const LocalizationController = require("./LocalizationController")

module.exports = new HistoryController()