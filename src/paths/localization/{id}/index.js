const LocalizationController = require("../../../controllers/LocalizationController")
const CacheController = require("../../../controllers/CacheController")

module.exports = {
    get: async (req, res) => {
        const id = "loc." + req.user.organization._id + "." + req.params.id

        const localization = await CacheController.get(id)

        if (req.user.organization._id !== localization.organizationId) {
            res.status(403).send()
            return
        }

        res.json(localization)
    },
    delete: async (req, res) => {
        const localization = await LocalizationController.getById(req.params.id)

        //Check rights
        if (req.user.organization._id !== localization.organizationId) {
            res.status(403).send()
            return
        }

        await LocalizationController.delete(req.params.id)

        res.json()
    }
}
