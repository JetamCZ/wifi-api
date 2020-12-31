const PlanController = require('../../controllers/PlanController')

module.exports = {
    get: async (req, res) => {
        const plan = await PlanController.getById(req.params.id)

        if(req.user.organization._id !== plan.organizationId) {
            res.status(403).send()
            return
        }

        res.json(plan)
    }
}