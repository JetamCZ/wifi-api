const db = require("../db");
const ImageController = require("../controllers/ImageController");

class PlanController {
  constructor() {
    this.model = db.getModel("Plan");
  }

  async create(orgId, plan) {
    for (let i = 0; i < plan.floors.length; i++) {
      plan.floors[i].image = await ImageController.moveFromTemp(
        plan.floors[i].image
      );
    }

    const newPlan = await new this.model({
      ...plan,
      organizationId: orgId,
    }).save();

    return await this.model.findById(newPlan._id).lean();
  }

  async getAll(orgId) {
    return this.model.find({ organizationId: orgId }).lean();
  }

  async getById(id) {
    return this.model.findById(id).lean();
  }

  async delete(id) {
    const plan = await this.getById(id);

    for (let i = 0; i < plan.floors.length; i++) {
      plan.floors[i].image = await ImageController.delete(plan.floors[i].image);
    }

    return this.model.findByIdAndDelete(id);
  }
}

module.exports = new PlanController();
