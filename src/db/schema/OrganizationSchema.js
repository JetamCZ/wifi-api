const { Schema } = require("mongoose");

const OrganizationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
  },
  __v: { type: Number, select: false },
});

module.exports = OrganizationSchema;
