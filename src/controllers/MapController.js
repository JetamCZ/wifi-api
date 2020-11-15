const db = require('../db')
const trilateration = require('node-trilateration');

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

        map.devices = devices.filter(d => {
            const lsBeacons = d.lastSeens.map(ls => ls.deviceKey)

            return d.lastSeens.some(ls => beaconsKeys.includes(ls.deviceKey))
        })

        map.devices = map.devices.filter(dev => {
            dev.lastSeens = dev.lastSeens.filter((ls) => this.diffInSeconds(new Date(ls.date)) < 30)

            return dev.lastSeens.length >= 3
        })

        map.devices = map.devices.map(dev => {
            dev.pos = {x: 0, y: 0}

            const data = []

            dev.lastSeens.forEach(ls => {
                const pos = map.beacons.find((b) => b.deviceKey === ls.deviceKey)

                if(pos) {
                    data.push({x: pos.x, y: pos.y, distance: ls.rssi * (-1)})
                }

            })

            dev.data = data

            dev.pos = trilateration.calculate(data)

            delete dev.lastSeens

            return dev
        })

        return map
    }

    diffInSeconds(date) {
        return Math.floor((new Date().getTime() - date.getTime()) / 1000);
    }

    async update(id, map) {
        await this.model.findByIdAndUpdate(id, map)
        return await this.model.findById(id).lean()
    }

}

const DeviceController = require('./DeviceController')
const BeaconController = require('./BeaconController')

module.exports = new MapController()