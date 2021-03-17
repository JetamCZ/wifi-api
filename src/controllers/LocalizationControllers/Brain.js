const brain = require("brain.js")

class Brain {
    async localize(localizationId, localizationData, localizationFingerPrints) {
        const net = new brain.NeuralNetwork();

        const devices = []

        const trainData = localizationFingerPrints.map(print => {
            const input = {}

            for(const beacon of print.beacons) {
                input[beacon.deviceKey] = 1/100*(beacon.rssi*-1)
            }

            return {
                input,
                output: {x: 1/10000*print.x, y: 1/10000*print.y, f: 1/10000*print.f}
            }
        })

        net.train(trainData)

        for (const [key, value] of Object.entries(localizationData)) {
            const input = {}

            for(const meet of value.meets) {
                input[meet.deviceKey] = 1/100*(meet.rssi*-1)
            }

            const output = net.run(input)

            //console.log(input, output)

            devices.push({
                mac: key,
                x: Math.round(output.x/(1/10000)),
                y: Math.round(output.y/(1/10000)),
                f: 0,
                custom: {}
            })
        }

        return devices
    }
}

module.exports = new Brain()