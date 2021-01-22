const db = require("../db");

class MeetController {
  constructor() {
    this.model = db.getModel("Meet");
  }

  async saveMeet(beaconDeviceKey, mac, rssi) {
    await this.model.updateOne(
      { deviceKey: beaconDeviceKey, mac },
      {
        date: new Date(),
        rssi: rssi,
        mac,
        deviceKey: beaconDeviceKey,
      },
      {
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );
  }

  async getMeetsByBeacon(beaconDeviceKey) {
    const meets = await this.model.find({ deviceKey: beaconDeviceKey }).lean();

    return meets.map((meet) => {
      delete meet._id;
      delete meet.deviceKey;

      return meet;
    });
  }

  async cleanupBeforeDay(date) {
    await this.model.deleteMany({ date: { $lt: date } });
  }
}

module.exports = new MeetController();
