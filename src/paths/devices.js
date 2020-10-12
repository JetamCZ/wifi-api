const db = require('../db')
const oui = require('oui')
const DeviceController = require('../controllers/DeviceController')

module.exports = {
    get: async (req, res) => {
        /*
        const model = db.getModel('RSSIInfo')

        const macs = await model.distinct('mac')

        const data = [];

        for (let i = 0; i < macs.length; i++) {
            const mac = macs[i]
            const rssiData = (await model.findOne({mac}, [], {sort: {'date': -1}}));

            data.push({
                mac,
                rssi: rssiData.rssi,
                date: rssiData.date,
                vendor: oui(mac)
            })
        }

        res.json(data);

         */

        const devices = await DeviceController.getAllDevices()
        res.json(devices)
    }
}