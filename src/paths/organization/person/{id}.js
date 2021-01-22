const Random = require("../../../utils/Random");

const UserController = require("../../../controllers/UserController");
const DeviceController = require("../../../controllers/DeviceController");

module.exports = {
  get: async (req, res) => {
    try {
      let user = await UserController.getUser(req.params.id);

      if (req.user.organization._id !== user.organizationId) {
        res.status(403).send();
        return;
      }

      user.devices = await UserController.getUserDevices(req.params.id);

      for (let i = 0; i < user.devices.length; i++) {
        user.devices[i].lastSeenDate = await DeviceController.getLastActivity(
          user.devices[i].mac
        );
      }

      user.lastSeen = await UserController.getLastActivity(req.params.id);

      delete user.settings;
      delete user.password;

      res.json(user);
    } catch (e) {
      res.status(500).send();
    }
  },
  delete: async (req, res) => {
    let user = await UserController.getUser(req.params.id);

    if (req.user.organization._id !== user.organizationId) {
      res.status(403).send();
      return;
    }

    await UserController.removeUser(req.params.id);

    res.send();
  },
};
