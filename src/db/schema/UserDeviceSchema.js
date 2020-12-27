const { Schema } = require('mongoose')

const UserDeviceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mac: {
        type: String,
        required: true
    },
    organizationId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    __v: { type: Number, select: false }
})

module.exports = UserDeviceSchema
