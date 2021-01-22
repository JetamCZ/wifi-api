const LocalizationController = require("../../../controllers/LocalizationController");

module.exports = {
  put: async (req, res) => {
    const localization = await LocalizationController.getById(req.params.id);

    if (req.user.organization._id !== localization.organizationId) {
      res.status(403).send();
      return;
    }

    const changedLoc = await LocalizationController.changeBeaconPositions(
      req.params.id,
      req.body
    );

    res.json(changedLoc);
  },
};
