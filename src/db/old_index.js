require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = require("mongoose");

let _mongoose;
let models = {};
let initation = false;

const RSIInfoSchema = require("./schema/RSIInfoSchema");
const BeaconSchema = require("./schema/BeaconSchema");
const DeviceSchema = require("./schema/DeviceSchema");
const LastSeenSchema = require("./schema/LastSeenSchema");
const MapSchema = require("./schema/MapSchema");
const DeviceNameSchema = require("./schema/DeviceNameSchema");
const PrintSchema = require("./schema/PrintSchema");
const OrganizationSchema = require("./schema/OrganizationSchema");
const UserSchema = require("./schema/UserSchema");

async function init() {
  console.log("NEW connection to DB");

  // Resolves deprecated warnings.
  mongoose.set("useNewUrlParser", true);
  mongoose.set("useCreateIndex", true);
  mongoose.set("useFindAndModify", false);

  const uristring = process.env.MONGODB_URI;

  mongoose.connect(
    uristring,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    function (err, res) {
      if (err) {
        console.error("ERROR connecting to: " + uristring + ". " + err);
      } else {
        console.log("Succeeded connected to: " + uristring);
        _mongoose = mongoose;
      }
    }
  );

  const NonStrictSchema = new Schema({}, { strict: false });

  //models.test = getMongoose().model('test', NonStrictSchema)
  models.RSSIInfo = getMongoose().model("RSSIInfo", RSIInfoSchema);
  models.Beacon = getMongoose().model("Beacon", BeaconSchema);
  models.Device = getMongoose().model("Device", DeviceSchema);
  models.LastSeen = getMongoose().model("LastSeen", LastSeenSchema);
  models.Map = getMongoose().model("Map", MapSchema);
  models.DeviceName = getMongoose().model("DeviceName", DeviceNameSchema);
  models.Print = getMongoose().model("Print", PrintSchema);
  models.Organization = getMongoose().model("Organization", OrganizationSchema);
  models.User = getMongoose().model("User", UserSchema);
}

function getMongoose() {
  if (!_mongoose) init();
  return _mongoose;
}

module.exports = {
  getModel(collectionName) {
    console.log(getMongoose());
    return models[collectionName];
  },
  matchId(value, field = "_id") {
    return { $match: { [field]: mongoose.Types.ObjectId(value) } };
  },
  init() {
    init();
  },
};
