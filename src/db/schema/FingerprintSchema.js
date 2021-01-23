const { Schema } = require("mongoose")

const FingerprintSchema = new Schema({
    localizationId: {
        type: String,
        required: true
    },
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    f: {
        type: Number,
        required: true
    },
    beacons: {
        required: true,
        type: [
            {
                deviceKey: {
                    type: String,
                    required: true
                },
                rssi: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    __v: { type: Number, select: false }
})

module.exports = FingerprintSchema
