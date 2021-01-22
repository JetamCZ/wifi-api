const db = require("../../db");

class NearestFingerPrint {
  constructor() {}

  async _getFingerPrints(localizationId) {
    const model = db.getModel("Fingerprint");

    return await model.find({ localizationId }).lean();
  }

  async localize(localizationId, localizationData) {
    const fingerPrints = await this._getFingerPrints(localizationId);

    const successfullyLocatedDevices = [];

    for (const [key, value] of Object.entries(localizationData)) {
      const fingerPrintsCopy = [...fingerPrints];

      fingerPrints.forEach((print) => {
        print.sum = 0;
        print.count = 0;

        print.beacons.forEach((printmeet) => {
          const dataSignal = value.meets.find(
            (meet) => meet.deviceKey === printmeet.deviceKey
          );

          if (dataSignal) {
            const diff = Math.abs(dataSignal.rssi - printmeet.rssi);
            //console.log(printmeet.deviceKey, dataSignal.rssi, printmeet.rssi, diff)
            print.sum += diff;
            print.count += 1;
          } else {
            //console.log(printmeet.deviceKey, "?", printmeet.rssi, "?")
          }
        });

        print.sum = print.sum / print.count;
        //console.log(print, value)
      });

      const nearestPrint = fingerPrintsCopy.sort((a, b) =>
        a.sum > b.sum ? 1 : -1
      );

      if (nearestPrint[0]) {
        successfullyLocatedDevices.push({
          mac: key,
          x: nearestPrint[0].x,
          y: nearestPrint[0].y,
          f: nearestPrint[0].f,
          custom: {
            fingerPrint: nearestPrint[0]._id,
          },
        });
      }
    }

    return successfullyLocatedDevices;
  }
}

module.exports = new NearestFingerPrint();
