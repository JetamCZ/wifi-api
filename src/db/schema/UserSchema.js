const { Schema } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  organizationId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  settings: {
    language: {
      type: String,
      required: true,
      default: "cs",
    },
  },
  __v: { type: Number, select: false },
});

module.exports = UserSchema;
