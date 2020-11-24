const { Schema } = require('mongoose')

const MapSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    layers: {
        type: [{
            p:  {
                type: Number,
                required: true,
                default: 0
            },
            image: {
                type: String
            }
        }]
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
                },
                p: {
                    type: Number,
                    required: true,
                    default: 0
                }
            }
        ]
    },
    __v: { type: Number, select: false }
})

module.exports = MapSchema
