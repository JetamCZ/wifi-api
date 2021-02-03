const trilateration = require('node-trilateration');

class Trilateration {
    async localize(localization, localizationData) {
        const successfullyLocatedDevices = []

        for(const [key, value] of Object.entries(localizationData)) {
            const deviceCalcData = []

            for(const meet of value.meets) {
                const beacon = localization.beacons.find(b => b.deviceKey === meet.deviceKey)

                deviceCalcData.push({
                    x: beacon.x,
                    y: beacon.y,
                    distance: meet.rssi * (-1)
                })
            }

            if(deviceCalcData.length > 2) {
                const pos = trilateration.calculate(deviceCalcData);

                if(pos.x && pos.y) {
                    successfullyLocatedDevices.push({
                        mac: key,
                        x: pos.x,
                        y: pos.y,
                        f: 0,
                        custom: {}
                    })
                }
            }
        }

        return successfullyLocatedDevices
    }
}

module.exports = new Trilateration()