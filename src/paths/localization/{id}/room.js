const RoomController = require("../../../controllers/RoomController")
const LocalizationController = require("../../../controllers/LocalizationController")

module.exports = {
    post: async (req, res) => {
        const localization = await LocalizationController.getById(req.params.id)

        //Check rights
        if (req.user.organization._id !== localization.organizationId) {
            res.status(403).send()
            return
        }

        const room = await RoomController.createNewRoom(req.params.id, req.body)

        res.json(room)
    }
}
