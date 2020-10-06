const { Schema } = require('mongoose')

const BeaconSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    device_key: {
        type: String,
        required: true
    },
    __v: { type: Number, select: false }
})

module.exports = BeaconSchema
