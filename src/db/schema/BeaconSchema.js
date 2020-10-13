const { Schema } = require('mongoose')

const BeaconSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    deviceKey: {
        type: String,
        required: true
    },
    lastSeenDate: {
        type: Date,
        required: true
    },
    __v: { type: Number, select: false }
})

module.exports = BeaconSchema
