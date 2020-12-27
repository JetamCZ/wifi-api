require('dotenv').config()
const mongoose = require('mongoose');
const { Schema } = require('mongoose')

const RSIInfoSchema = require('./schema/RSIInfoSchema')
const BeaconSchema = require('./schema/BeaconSchema')
const DeviceSchema = require('./schema/DeviceSchema')
const LastSeenSchema = require('./schema/LastSeenSchema')
const MapSchema = require('./schema/MapSchema')
const DeviceNameSchema = require('./schema/DeviceNameSchema')
const PrintSchema = require('./schema/PrintSchema')
const OrganizationSchema = require('./schema/OrganizationSchema')
const UserSchema = require('./schema/UserSchema')
const InvitationSchema = require('./schema/InvitationSchema')
const OrgBeaconSchema = require('./schema/OrgBeaconSchema')
const MeetSchema = require('./schema/MeetSchema')
const UserDeviceSchema = require('./schema/UserDeviceSchema')

class DB {
    constructor() {
        this.models = {}

        this.connect()

        this.initModels()
    }

    connect() {
        const uristring = process.env.MONGODB_URI

        mongoose.connect(uristring, {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false
        }, function(err, res) {
            if (err) {
                console.error('ERROR connecting to: ' + uristring + '. ' + err)

            } else {
                console.log('Succeeded connected to: ' + uristring)
            }
        });
    }

    getMongoose() {
        return this._ms
    }

    initModels() {
        const NonStrictSchema = new Schema({}, { strict: false })

        //models.test = getMongoose().model('test', NonStrictSchema)
        this.models.RSSIInfo = mongoose.model('RSSIInfo', RSIInfoSchema)
        this.models.Beacon = mongoose.model('Beacon', BeaconSchema)
        this.models.Device = mongoose.model('Device', DeviceSchema)
        this.models.LastSeen = mongoose.model('LastSeen', LastSeenSchema)
        this.models.Map = mongoose.model('Map', MapSchema)
        this.models.DeviceName = mongoose.model('DeviceName', DeviceNameSchema)
        this.models.Print = mongoose.model('Print', PrintSchema)
        this.models.Organization = mongoose.model('Organization', OrganizationSchema)
        this.models.User = mongoose.model('User', UserSchema)
        this.models.Invitation = mongoose.model('Invitation', InvitationSchema)
        this.models.OrgBeacon = mongoose.model('OrgBeacon', OrgBeaconSchema)
        this.models.Meet = mongoose.model('Meet', MeetSchema)
        this.models.UserDevice = mongoose.model('UserDevice', UserDeviceSchema)
    }

    getModel(collectionName) {
        return this.models[collectionName]
    }
}

module.exports = new DB()