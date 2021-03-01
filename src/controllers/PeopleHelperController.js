const UserController = require("./UserController")
const OrganizationController = require("./OrganizationController")

class PeopleHelperController {
    async getAllPeopleWithLastActivity(orgId) {
        const people = await OrganizationController.getAllPeople(orgId)

        for (let i = 0; i < people.length; i++) {
            people[i].lastSeen = await UserController.getLastActivity(people[i]._id)

            delete people[i].settings
            delete people[i].password
            delete people[i].organizationId
        }

        return people
    }
}

module.exports = new PeopleHelperController()