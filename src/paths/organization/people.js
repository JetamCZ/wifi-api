const OrganizationController = require('../../controllers/OrganizationController')
const Random = require("../../utils/Random");

module.exports = {
    get: async (req, res) => {
        const people = await OrganizationController.getAllPeople(req.user.organization._id)

        const formattedPeople = people.map(user => {

            let fakeDate = new Date()
            fakeDate.setSeconds(fakeDate.getSeconds() - Random.randomIntFromInterval(0, 180))

            user.lastSeen = fakeDate

            delete user.settings
            delete user.password
            delete user.organizationId

            return user
        })

        res.json(formattedPeople)
    }
}