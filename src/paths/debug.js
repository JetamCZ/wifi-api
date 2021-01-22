const LocalizationController = require("../controllers/LocalizationController");

module.exports = {
  get: async (req, res) => {
    const data = await LocalizationController.locationData(null, [
      "e0:d0:83:d6:2a:57",
    ]);

    res.json(data);
  },
};
