const { Schema } = require("mongoose")

const HistoryBeaconSchema = new Schema({
    orgBeaconId: {
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
    __v: { type: Number, select: false }
})

module.exports = HistoryBeaconSchema
