const OrganizationController = require('../../../controllers/OrganizationController')
const MeetController = require('../../../controllers/MeetController')

module.exports = {
    get: async (req, res) => {
        const beacon = await OrganizationController.getOrgBeaconById(req.params.id)

        if(req.user.organization._id !== beacon.organizationId) {
            res.status(403).send()
            return
        }

        beacon.devices = await MeetController.getMeetsByBeacon(beacon.deviceKey)

        res.json(beacon)
    },
    delete: async (req, res) => {
        const beacon = await OrganizationController.getOrgBeaconById(req.params.id)

        if(req.user.organization._id !== beacon.organizationId) {
            res.status(403).send()
            return
        }

        await OrganizationController.deleteOrgBeacon(req.params.id)

        res.send()
    }
}