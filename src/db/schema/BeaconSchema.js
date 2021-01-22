const { Schema } = require("mongoose");

//Slouží k uložení lastSeenDate beaconu
const BeaconSchema = new Schema({
  deviceKey: {
    type: String,
    required: true,
  },
  lastSeenDate: {
    type: Date,
    required: true,
  },
  __v: { type: Number, select: false },
});

module.exports = BeaconSchema;
