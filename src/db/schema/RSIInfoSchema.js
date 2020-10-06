const { Schema } = require('mongoose')

const RSIInfoSchema = new Schema({
    device_key: {
        type: String,
        required: true
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
