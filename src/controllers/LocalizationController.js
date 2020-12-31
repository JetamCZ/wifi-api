const db = require('../db')

class LocalizationController {
   constructor() {
       this.model = db.getModel('Localization')
   }

   async create(organizationId, localization) {
       const newLocalization = await new this.model({
           ...localization,
           organizationId
       }).save()

       return await this.model.findById(newLocalization._id).lean()
   }

   async getOrgAll(organizationId) {
       return await this.model.find({organizationId}).lean()
   }

   async getById(id) {
       return await this.model.findById(id).lean()
   }
}

module.exports = new LocalizationController()