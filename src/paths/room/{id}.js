const RoomController = require("../../controllers/RoomController")
const LocalizationController = require("../../controllers/LocalizationController")

module.exports = {
    put: async (req, res) => {
        const room = await RoomController.getById(req.params.id)
        const localization = await LocalizationController.getById(room.localizationId)

        if (req.user.organization._id !== localization.organizationId) {
            res.status(403).send()
            return
        }

        const editedRoom = await RoomController.updateRoom(req.params.id, req.body)

        res.json(editedRoom)
    },
    get: async (req, res) => {
        const room = await RoomController.getById(req.params.id)
        const localization = await LocalizationController.getById(room.localizationId)

        if (req.user.organization._id !== localization.organizationId) {
            res.status(403).send()
            return
        }

        res.json(room)
    },
    delete: async (req, res) => {
        const room = await RoomController.getById(req.params.id)
        const localization = await LocalizationController.getById(room.localizationId)

        if (req.user.organization._id !== localization.organizationId) {
            res.status(403).send()
            return
        }

        await RoomController.deleteById(req.params.id)

        res.json()
    }
}
