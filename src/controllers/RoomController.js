const db = require("../db")
const Random = require("../utils/Random")
const inside = require('point-in-polygon');

class RoomController {
    constructor() {
        this.model = db.getModel('Room')
    }

    async createNewRoom(localizationId, room) {
        const newRoom = await (new this.model({
            ...room,
            color: Random.getRandomColor(),
            localizationId
        }).save())

        return await this.model.findById(newRoom._id)
    }

    async getByLocalizationId(localizationId) {
        return await this.model.find({localizationId}).lean()
    }

    async getById(roomId) {
        return this.model.findById(roomId);
    }

    async updateRoom(roomId, room) {
        await this.model.findByIdAndUpdate(roomId, {
            name: room.name,
            polygon: room.polygon,
            f: room.f
        })

        return this.getById(roomId)
    }

    async deleteById(roomId) {
        return this.model.findByIdAndDelete(roomId)
    }

    getRoomByPoint(rooms, point) {
        const resultRooms = []

        for (const room of rooms) {
            if(inside(point, room.polygon)) {
                resultRooms.push({
                    _id: room._id,
                    name: room.name,
                    f: room.f,
                    color: room.color
                })
            }
        }

        return resultRooms
    }
}

module.exports = new RoomController()