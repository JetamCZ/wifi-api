const { Schema } = require("mongoose")

const RoomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    localizationId: {
        type: String,
        required: true
    },
    polygon: {
        type: Array,
        required: true
    },
    __v: { type: Number, select: false }
})

module.exports = RoomSchema
