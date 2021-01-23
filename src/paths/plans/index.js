const PlanController = require("../../controllers/PlanController")

module.exports = {
    get: async (req, res) => {
        const plans = await PlanController.getAll(req.user.organization._id)
        res.json(plans)
    },
    post: async (req, res) => {
        const plan = await PlanController.create(req.user.organization._id, req.body)
        res.json(plan)
    }
}
