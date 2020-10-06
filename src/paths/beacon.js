const db = require('../db')

module.exports = {
    post: async (req, res) => {
        const model = db.getModel('RSSIInfo')

        const data = new model({device_key: "TEST", mac: "abc", rssi: 0}).save()

        console.log(data);

        console.log(req.body)

        res.send(req.body)
    }
}