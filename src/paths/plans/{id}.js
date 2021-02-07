const PlanController = require("../../controllers/PlanController")
const LocalizationController = require("../../controllers/LocalizationController")

module.exports = {
    get: async (req, res) => {
        const plan = await PlanController.getById(req.params.id)

        if (req.user.organization._id !== plan.organizationId) {
            res.status(403).send()
            return
        }

        res.json(plan)
    },
    put: async (req, res) => {
        const plan = await PlanController.getById(req.params.id)

        if (req.user.organization._id !== plan.organizationId) {
            res.status(403).send()
            return
        }

        await PlanController.rename(req.params.id, req.body.name)

        res.json(plan)
    },
    delete: async (req, res) => {
        const plan = await PlanController.getById(req.params.id)

        if (req.user.organization._id !== plan.organizationId) {
            res.status(403).send()
            return
        }

        const locs = await LocalizationController.getByPlan(req.params.id)

        if (locs.length > 0) {
            res.status(400).send()
            return
        }

        await PlanController.delete(req.params.id)

        res.json()
    }
}
