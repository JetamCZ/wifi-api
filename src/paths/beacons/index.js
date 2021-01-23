const OrganizationController = require("../../controllers/OrganizationController")

module.exports = {
    post: async (req, res) => {
        try {
            const newBeacon = await OrganizationController.connectBeaconToOrg(
                req.body.deviceKey,
                req.user.organization._id,
                req.body.name,
                req.body.desc
            )

            res.json(newBeacon)
        } catch (e) {
            res.status(400).json()
        }
    },
    get: async (req, res) => {
        const beacons = await OrganizationController.getOrgBeacons(req.user.organization._id)

        res.json(beacons)
    }
}
