const OrganizationController = require("../../controllers/OrganizationController")

module.exports = {
    get: async (req, res) => {
        const token = await OrganizationController.createInvitation(req.user.organization._id)

        res.json(token)
    }
}
