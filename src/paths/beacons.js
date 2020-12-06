const BeaconController = require('../controllers/BeaconController')

module.exports = {
    get: async (req, res) => {
        let beacons = await BeaconController.getAll()

        beacons = beacons.map(beacon => {
            delete beacon._id
            return beacon
        })

        res.json(beacons)
    }
}