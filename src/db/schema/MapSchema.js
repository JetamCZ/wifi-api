const { Schema } = require('mongoose')

const MapSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    image: {
        type: String
    },
    beacons: {
        type: [
            {
                deviceKey: {
                    type: String,
                    required: true,
                    ref: 'Beacon'
                },
                x: {
                    type: Number,
                    required: true
                },
                y: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    __v: { type: Number, select: false }
})

module.exports = MapSchema
