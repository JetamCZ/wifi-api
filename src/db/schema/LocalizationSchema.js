const { Schema } = require("mongoose")

const LocalizationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    organizationId: {
        type: String,
        required: true
    },
    planId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    beacons: {
        type: [
            {
                deviceKey: {
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
                }
            }
        ]
    },
    __v: { type: Number, select: false }
})

module.exports = LocalizationSchema
