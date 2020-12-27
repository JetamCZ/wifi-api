const Random = require("../../../utils/Random");

const UserController = require('../../../controllers/UserController')

module.exports = {
    get: async (req, res) => {
        try {
            let user = await UserController.getUser(req.params.id)

            if(req.user.organization._id !== user.organizationId) {
                res.status(403).send()
            }

            user.devices = []

            let fakeDate = new Date()
            fakeDate.setSeconds(fakeDate.getSeconds() - Random.randomIntFromInterval(0, 180))

            user.lastSeen = fakeDate

            delete user.settings
            delete user.password

            res.json(user)
        } catch (e) {
            res.status(500).send()
        }
    }
}