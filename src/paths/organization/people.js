const OrganizationController = require("../../controllers/OrganizationController")
const UserController = require("../../controllers/UserController")
const Random = require("../../utils/Random")

module.exports = {
    get: async (req, res) => {
        const people = await OrganizationController.getAllPeopleWithLastActivity(req.user.organization._id)

        res.json(people)
    }
}
