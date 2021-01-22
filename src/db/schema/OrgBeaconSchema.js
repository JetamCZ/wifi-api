const { Schema } = require("mongoose");

const OrgBeaconSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  deviceKey: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
  },
  organizationId: {
    type: String,
    required: true,
  },
  __v: { type: Number, select: false },
});

module.exports = OrgBeaconSchema;
