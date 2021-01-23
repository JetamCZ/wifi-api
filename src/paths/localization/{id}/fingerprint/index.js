const LocalizationController = require("../../../../controllers/LocalizationController")

module.exports = {
    post: async (req, res) => {
        const localization = await LocalizationController.getById(req.params.id)

        if (req.user.organization._id !== localization.organizationId) {
            res.status(403).send()
            return
        }

        const print = await LocalizationController.saveFingerPrint(req.params.id, req.body)
        res.json(print)
    }
}
