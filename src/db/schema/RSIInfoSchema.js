const { Schema } = require('mongoose')

const RSIInfoSchema = new Schema({
    beaconId: {
        type: Schema.Types.ObjectId,
        ref: 'Beacon',
    },
    mac: {
        type: String,
        required: true
    },
    rssi: {
        type: Number,
        required: true
    },
    __v: { type: Number, select: false }
})

module.exports = RSIInfoSchema
