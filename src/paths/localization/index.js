const LocalizationController = require('../../controllers/LocalizationController')

module.exports = {
    get: async (req, res) => {
        const localizations = await LocalizationController.getOrgAll(req.user.organization._id)
        res.json(localizations)
    },
    post: async (req, res) => {
        const localization = await LocalizationController.create(req.user.organization._id, req.body)

        res.json(localization)
    }
}