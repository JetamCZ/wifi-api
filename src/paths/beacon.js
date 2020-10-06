const db = require('../db')

module.exports = {
    post: async (req, res) => {
        const model = db.getModel('RSSIInfo')

        req.body.devices.forEach(device => {
            new model({
                date: new Date(),
                device_key: req.body.device_key,
                mac: device.mac,
                rssi: device.rssi
            }).save()
        })


        res.status(202).send()
    }
}