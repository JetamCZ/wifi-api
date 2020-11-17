const { Schema } = require('mongoose')

const DeviceNameSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    mac: {
        type: String,
        required: true
    },
    __v: { type: Number, select: false }
})

module.exports = DeviceNameSchema
