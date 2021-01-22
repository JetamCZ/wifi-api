const db = require("../../db");

module.exports = {
  get: async (req, res) => {
    const model = db.getModel("RSSIInfo");

    const devices = await model.find({ mac: req.params.macAddress });

    res.json(devices);
  },
};
