const { Schema } = require("mongoose")

const RegistrationKeySchema = new Schema({
    usedBy: {
        type: String,
    },
    code: {
        type: String,
        required: true
    },
    usedDate: {
        type: Date
    },
    is_used: {
        type: Boolean,
        required: true
    },
    __v: { type: Number, select: false }
})

module.exports = RegistrationKeySchema
