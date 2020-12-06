const db = require('../db')

class MapController {
    constructor() {
        this.model = db.getModel('Map')
    }

    async getAll() {
        return await this.model.find().lean()
    }

    async create(map) {
        return new this.model(map).save()
    }

    async getMapById(id) {
        const map = await this.model.findById(id).lean()
        const devices = await DeviceController.getAllDevices()

        const beaconsKeys = map.beacons.map(beacon => beacon.deviceKey)

        for (let i = 0; i < map.beacons.length; i++) {
            const beacon = await BeaconController.getByDeviceKey(map.beacons[i].deviceKey)

            map.beacons[i].name = beacon.name || ""
            map.beacons[i].lastSeenDate = beacon.lastSeenDate || null
        }

        //GET ONLY devices for this map
        map.devices = devices.filter(d => {
            return d.mac === 'e0:d0:83:d6:2a:57' || d.mac === '58:00:e3:ca:99:01'
        })

        map.devices = devices.filter(d => {
            const lsBeacons = d.lastSeens.map(ls => ls.deviceKey)
            return d.lastSeens.some(ls => beaconsKeys.includes(ls.deviceKey))
        })

        map.devices = await CalculatePos.localize(map, map.devices)

        map.prints = await this.getAllPrints(map._id)

        return map
    }

    async update(id, map) {
        await this.model.findByIdAndUpdate(id, map)
        return await this.model.findById(id).lean()
    }

    async delete(id) {
        await this.model.findByIdAndDelete(id)
    }

    async savePrint(id, print) {
        await new (db.getModel('Print'))({
            map: id,
            ...print
        }).save()
    }

    async getAllPrints(id) {
        return await db.getModel('Print').find({map: id}).lean()
    }

}

const DeviceController = require('./DeviceController')
const BeaconController = require('./BeaconController')
const CalculatePos = require('./CalculatePos')

module.exports = new MapController()