const OrganizationController = require('../../../controllers/OrganizationController')

module.exports = {
    get: async (req, res) => {
        const beacon = await OrganizationController.getOrgBeaconById(req.params.id)

        res.json(beacon)
    }
}