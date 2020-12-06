const { Schema } = require('mongoose')

const OrganizationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    __v: { type: Number, select: false }
})

module.exports = OrganizationSchema
