const db = require("../db")

class CacheController {
    constructor() {
        this.model = db.getModel("Cache")
    }

    async store(id, data) {
        await this.model.updateOne(
            { uniqueId: id },
            {
                uniqueId: id,
                date: new Date(),
                data
            },
            {
                upsert: true,
                setDefaultsOnInsert: true
            }
        )
    }

    async get(id) {
        const item = await this.model.findOne({ uniqueId: id }).lean()
        return item ? item.data : null
    }
}

module.exports = new CacheController()
