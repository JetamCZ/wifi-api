const LocalizationController = require("../../../../controllers/LocalizationController")

module.exports = {
    get: async (req, res) => {
        const localization = await LocalizationController.getById(req.params.id)

        if (req.user.organization._id !== localization.organizationId) {
            res.status(403).send()
            return
        }

        const beaconIds = localization.beacons.map((beacon) => beacon.deviceKey)

        const data = await LocalizationController.locationData(beaconIds, req.params.mac)

        res.json(data)
    }
}
