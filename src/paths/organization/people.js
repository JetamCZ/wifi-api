const OrganizationController = require("../../controllers/OrganizationController");
const UserController = require("../../controllers/UserController");
const Random = require("../../utils/Random");

module.exports = {
  get: async (req, res) => {
    const people = await OrganizationController.getAllPeople(
      req.user.organization._id
    );

    for (let i = 0; i < people.length; i++) {
      people[i].lastSeen = await UserController.getLastActivity(people[i]._id);

      delete people[i].settings;
      delete people[i].password;
      delete people[i].organizationId;
    }

    res.json(people);
  },
};
