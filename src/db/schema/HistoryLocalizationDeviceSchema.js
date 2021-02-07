const { Schema } = require("mongoose")

const HistoryLocalizationDeviceSchema = new Schema({
    deviceId: {
        type: String,
        required: true
    },
    localizationId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    rooms: [],
    __v: { type: Number, select: false }
})

module.exports = HistoryLocalizationDeviceSchema
