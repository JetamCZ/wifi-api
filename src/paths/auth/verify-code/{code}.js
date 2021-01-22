const OrganizationController = require("../../../controllers/OrganizationController");

module.exports = {
  get: async (req, res) => {
    const check = await OrganizationController.verifyCode(req.params.code);

    if (!check) {
      res.status(403);
    }

    res.json(check);
  },
};
