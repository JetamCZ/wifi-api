const { Schema } = require('mongoose')

const PlanSchema = new Schema({
    organizationId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    floors: {
        type: [
            {
                floor: {
                    type: Number,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                image: {
                    type: String,
                    required: true
                },
            }
        ]
    },
    __v: { type: Number, select: false }
})

module.exports = PlanSchema
