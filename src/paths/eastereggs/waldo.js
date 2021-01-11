const LocalizationController = require('../../controllers/LocalizationController')

module.exports = {
    post: async (req, res) => {
        const localization = await LocalizationController.create(req.user.organization._id, {
            "name": "Where is Waldo?",
            "planId": "waldo",
            "type": "WALDO",
            "beacons": [
            ]
        })

        res.json(localization)
    }
}