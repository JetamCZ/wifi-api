const db = require('../db')

class PlanController {
    constructor() {
        this.model = db.getModel('Plan')
    }

    async create(orgId, plan) {
        const newPlan = await new this.model({
            ...plan,
            organizationId: orgId
        }).save()

        return await this.model.findById(newPlan._id).lean()
    }

    async getAll(orgId) {
        return this.model.find({organizationId: orgId}).lean()
    }

    async getById(id) {
        return this.model.findById(id).lean()
    }
}

module.exports = new PlanController()