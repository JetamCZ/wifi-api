const db = require("../db")

class RoomController {
    constructor() {
        this.model = db.getModel('Room')
    }

    async createNewRoom(localizationId, room) {
        const newRoom = await (new this.model({
            ...room,
            localizationId
        }).save())

        return await this.model.findById(newRoom._id)
    }

    async getByLocalizationId(localizationId) {
        return await this.model.find({localizationId}).lean()
    }
}

module.exports = new RoomController()