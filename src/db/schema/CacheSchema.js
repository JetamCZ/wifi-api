const { Schema } = require('mongoose')

const CacheSchema = new Schema({
    uniqueId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false
    },
    data: {
        type: Schema.Types.Mixed
    },
    __v: { type: Number, select: false }
})

module.exports = CacheSchema
