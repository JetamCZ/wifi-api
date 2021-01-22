const OrganizationController = require("../../controllers/OrganizationController");

module.exports = {
  post: async (req, res) => {
    try {
      const org = await OrganizationController.createOrg(req.body.name);

      org.invCode = await OrganizationController.createInvitation(org._id);

      delete org.__v;
      //delete org._id

      res.json(org);
    } catch (e) {
      res.status(400).json({});
    }
  },
};
