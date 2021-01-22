const { Schema } = require("mongoose");

const DeviceSchema = new Schema({
  mac: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  lastSeenDate: {
    type: Date,
    required: true,
  },
  __v: { type: Number, select: false },
});

module.exports = DeviceSchema;
