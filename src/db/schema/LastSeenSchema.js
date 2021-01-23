const { Schema } = require("mongoose")

const LastSeenShema = new Schema({
    deviceId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Device"
    },
    date: {
        type: Date,
        required: true
    },
    deviceKey: {
        type: String,
        required: true
    },
    rssi: {
        type: Number,
        required: true
    },
    __v: { type: Number, select: false }
})

module.exports = LastSeenShema
