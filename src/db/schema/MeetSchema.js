const { Schema } = require("mongoose");

const MeetSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  deviceKey: {
    type: String,
    required: true,
  },
  mac: {
    type: String,
    required: true,
  },
  rssi: {
    type: Number,
    required: true,
  },
  __v: { type: Number, select: false },
});

module.exports = MeetSchema;
