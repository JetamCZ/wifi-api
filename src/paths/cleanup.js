const DeviceController = require('../controllers/DeviceController')

module.exports = {
    put: async (req, res) => {
        const date = new Date();
        date.setHours(date.getHours() - 1)

        console.log(date.toString())

        const devices = await DeviceController.cleanupBeforeDay(date)

        res.status(200).send()
    }
}