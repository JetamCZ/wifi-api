const { Schema } = require('mongoose')

const PrintSchema = new Schema({
    map: {
        type: String,
        required: true
    },
    pos: {
       x: {
           type: Number,
           required: true,
       },
        y: {
            type: Number,
            required: true,
        },
        p: {
            type: Number,
            required: true,
        }
    },
    beacons: {
        required: true,
        type: [
            {
                deviceKey: {
                    type: String,
                    required: true
                },
                rssi: {
                    type: Number,
                    required: true
                }
            }
        ],
    },
    __v: { type: Number, select: false }
})

module.exports = PrintSchema
