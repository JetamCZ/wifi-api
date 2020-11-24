const trilateration = require('node-trilateration');

class CalculatePos {
    getOnlyRelativeDevices(devices) {
        return devices.filter(dev => {
            dev.lastSeens = dev.lastSeens.filter((ls) => Time.diffInSeconds(new Date(ls.date)) < 30)

            return dev.lastSeens.length >= 3
        })
    }

    rssiToDistance(rssi) {
        return rssi * (-1);
    }

    getDataForDevices(map, devices) {
        return devices.map(dev => {
            dev.data = []

            dev.lastSeens.forEach(ls => {
                const pos = map.beacons.find((b) => b.deviceKey === ls.deviceKey)

                if(pos) {
                    dev.data.push({
                        beacon: {
                            deviceKey: ls.deviceKey,
                            x: pos.x, y: pos.y
                        },
                        rssi: ls.rssi,
                    })
                }
            })

            return dev
        })
    }

    trilaterationMethod(devices) {
        return devices.map(dev => {
            if(dev.pos) {
                return dev
            }

            if(dev.data.length >= 3) {
                const data = []

                dev.data.forEach(d => {
                    data.push({x: d.beacon.x, y: d.beacon.y, distance: this.rssiToDistance(d.rssi)})
                })

                dev.pos = {...trilateration.calculate(data), p: "*", method: "Trilateration"}

            }

            return dev
        })
    }

    async finderPrintMethod(map, devices) {
        const prints = await db.getModel('Print').find({map: map._id}).lean()

        devices = devices.map((dev) => {
            if(dev.pos) {
                return dev
            }

            const deviceBeacons = dev.lastSeens.map(ls => ls.deviceKey)
            let devicePrints = []

            prints.forEach(print => {
                let sum = 0
                let success = 0
                let fail = 0

                print.beacons.forEach(beacon => {
                    if(deviceBeacons.includes(beacon.deviceKey)) {
                        const deviceRssi = dev.lastSeens.find(ls => ls.deviceKey === beacon.deviceKey).rssi

                        sum = sum + Math.abs(beacon.rssi - deviceRssi)

                        success++
                    } else {
                        fail++
                    }
                })

                print.sum = sum
                devicePrints.push(print)
            })

            if(devicePrints.length > 0) {
                devicePrints = devicePrints.sort((a, b) => (a.sum > b.sum) ? 1 : -1)

                if(devicePrints[0].sum < 50) {
                    dev.pos = {
                        x: devicePrints[0].pos.x,
                        y: devicePrints[0].pos.y,
                        p: devicePrints[0].pos.p,
                        method: "FingerPrint"
                    }
                }
            }

            return dev
        })

        return devices
    }

    async localize(map, devices) {
        devices = this.getOnlyRelativeDevices(devices)
        devices = this.getDataForDevices(map, devices)

        devices = devices.map(dev => {
            dev.pos = null
            return dev
        })

        await this.finderPrintMethod(map, devices)

        devices = this.trilaterationMethod(devices)

        return devices
    }

}

const db = require('../db')
const Time = require('../utils/Time')


module.exports = new CalculatePos()