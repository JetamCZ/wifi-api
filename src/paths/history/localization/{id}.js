const HistoryController = require("../../../controllers/HistoryController")
const LocalizationController = require("../../../controllers/LocalizationController")

module.exports = {
    get: async (req, res) => {
        const localization = await LocalizationController.getById(req.params.id)

        if (req.user.organization._id !== localization.organizationId) {
            res.status(403).send()
            return
        }

        const history = await HistoryController.getLocalizationHistory(req.params.id)
        res.json(history)
    }
}