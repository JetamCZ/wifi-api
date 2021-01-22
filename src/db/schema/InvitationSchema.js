const { Schema } = require("mongoose");

const InvitationSchema = new Schema({
  organizationId: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  expiration: {
    type: Date,
    required: true,
  },
  __v: { type: Number, select: false },
});

module.exports = InvitationSchema;
