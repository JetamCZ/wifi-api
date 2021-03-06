const trilateration = require("node-trilateration")
const distanceMapping = require("../../consts/distanceMapping")

class Trilateration {
    isPointInCircle(circle, point) {
        return Math.sqrt(Math.pow(point[0] - circle[0], 2) + Math.pow(point[1] - circle[1], 2)) < circle[2]
    }

    intersectionsOfTwoCircles(circle1, circle2) {
        const c = Math.sqrt(Math.pow(circle1[0] - circle2[0], 2) + Math.pow(circle1[1] - circle2[1], 2))
        const d = (Math.pow(circle1[2], 2) + Math.pow(c, 2) - Math.pow(circle2[2], 2)) / (2 * c)
        const h = Math.sqrt(Math.pow(circle1[2], 2) - Math.pow(d, 2))

        const points = [
            [
                ((circle2[0] - circle1[0]) * d) / c + ((circle2[1] - circle1[1]) * h) / c + circle1[0],
                ((circle2[1] - circle1[1]) * d) / c - ((circle2[0] - circle1[0]) * h) / c + circle1[1]
            ],
            [
                ((circle2[0] - circle1[0]) * d) / c - ((circle2[1] - circle1[1]) * h) / c + circle1[0],
                ((circle2[1] - circle1[1]) * d) / c + ((circle2[0] - circle1[0]) * h) / c + circle1[1]
            ]
        ]

        return points.filter((p) => p[0] && p[1])
    }

    calc(data, dx, maxDx = 50, step = 0.1) {
        if (data.length < 2) {
            return null
        }

        if (dx >= maxDx) {
            console.log("MAX DX calc: "+dx, data)
            return null
        }

        const intersection = this.intersectionsOfTwoCircles(
            [data[0].x, data[0].y, data[0].distance * dx],
            [data[1].x, data[1].y, data[1].distance * dx]
        )

        if (intersection.length >= 2) {
            for (const point of intersection) {
                if (this.isPointInCircle([data[2].x, data[2].y, data[2].distance * dx], point)) {
                    return [...point, dx]
                }
            }
        }

        if(intersection.length >= 1 && dx+step >= maxDx) {
            return [...intersection[0], dx]
        }

        return this.calc(data, dx + step, maxDx, step)
    }

    async localize(localization, localizationData) {
        const successfullyLocatedDevices = []

        for (const [key, value] of Object.entries(localizationData)) {
            const deviceCalcData = []

            for (const meet of value.meets) {
                const beacon = localization.beacons.find((b) => b.deviceKey === meet.deviceKey)

                deviceCalcData.length < 3 && deviceCalcData.push({
                    x: beacon.x,
                    y: beacon.y,
                    rssi: meet.rssi,
                    distance: distanceMapping[meet.rssi] > 0 ? distanceMapping[meet.rssi] : 120
                })
            }

            //console.log(deviceCalcData)

            deviceCalcData.sort((a, b) => (a.distance > b.distance) ? 1 : -1)

            if (deviceCalcData.length > 2) {
                const pos = this.calc(deviceCalcData, 1, 1000, 1)

                if (pos) {
                    successfullyLocatedDevices.push({
                        mac: key,
                        x: pos[0],
                        y: pos[1],
                        f: 0,
                        custom: {
                            deviceCalcData,
                            dx: pos[2]
                        }
                    })
                }
            }
        }

        return successfullyLocatedDevices
    }
}

module.exports = new Trilateration()
