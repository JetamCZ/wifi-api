const OrganizationController = require("../../controllers/OrganizationController")
const PeopleHelperController = require("../../controllers/PeopleHelperController")
const Random = require("../../utils/Random")

module.exports = {
    get: async (req, res) => {
        const people = await PeopleHelperController.getAllPeopleWithLastActivity(req.user.organization._id)

        res.json(people)
    }
}
