const { Schema } = require("mongoose")

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    organizationId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 3
    },
    password: {
        type: String,
        required: true
    },
    settings: {
        language: {
            type: String,
            required: true,
            default: "cs"
        }
    },
    __v: { type: Number, select: false }
})

module.exports = UserSchema
