const BeaconController = require('../controllers/BeaconController')

module.exports = {
    get: async (req, res) => {
        const beacons = await BeaconController.getAll()
        res.json(beacons)
    }
}