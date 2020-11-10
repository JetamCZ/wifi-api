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
            map.beacons[i].name = (await BeaconController.getByDeviceKey(map.beacons[i].deviceKey)).name || ""
        }

        map.devices = devices.filter(d => {
            const lsBeacons = d.lastSeens.map(ls => ls.deviceKey)

            return d.lastSeens.some(ls => beaconsKeys.includes(ls.deviceKey))
        })

        return map
    }

    async update(id, map) {
        await this.model.findByIdAndUpdate(id, map)
        return await this.model.findById(id).lean()
    }

}

const DeviceController = require('./DeviceController')
const BeaconController = require('./BeaconController')

module.exports = new MapController()