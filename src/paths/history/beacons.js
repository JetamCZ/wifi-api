const HistoryController = require("../../controllers/HistoryController")

module.exports = {
    get: async (req, res) => {
        const beacons = await HistoryController.getOrgBeaconHistory(req.user.organization._id)
        res.json(beacons)
    }
}