const db = require("../db");

class OrganizationController {
  constructor() {
    this.model = db.getModel("Organization");
  }

  async gerOrgById(id) {
    return await this.model.findById(id);
  }

  async createOrg(name) {
    const newOrg = await new this.model({
      name,
      created: new Date(),
    }).save();

    return this.model.findById(newOrg._id).lean();
  }

  makeCode(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async createInvitation(orgId) {
    const invModel = db.getModel("Invitation");

    const code = this.makeCode(80);

    let expiration = new Date();
    expiration.setDate(expiration.getDate() + 7);

    const newInv = await new invModel({
      organizationId: orgId,
      expiration,
      code,
    }).save();

    return code;
  }

  async useCode(code) {
    if (!(await this.verifyCode(code))) {
      throw new Error("Wrong invitation code");
    }

    const invModel = db.getModel("Invitation");
    const invitation = await invModel.findOne({ code });

    if (invitation) {
      await invModel.findOneAndDelete({ code });
      return invitation;
    } else {
      throw new Error("Wrong invitation code");
    }
  }

  async verifyCode(code) {
    const invModel = db.getModel("Invitation");

    const inv = await invModel.findOne({ code }).lean();

    if (inv && inv.expiration > new Date()) {
      return true;
    }

    return false;
  }

  async getAllPeople(orgId) {
    const userModel = db.getModel("User");

    return await userModel.find({ organizationId: orgId }).lean();
  }

  async connectBeaconToOrg(deviceKey, organizationId, name, desc) {
    const orgBeaconModel = db.getModel("OrgBeacon");

    const test = await orgBeaconModel.findOne({ deviceKey, organizationId });

    if (test) {
      throw new Error("Already exist");
    }

    const newOrgBeacon = await new orgBeaconModel({
      deviceKey,
      organizationId,
      name,
      desc,
    }).save();

    return await orgBeaconModel.findById(newOrgBeacon._id).lean();
  }

  async getOrgBeacons(organizationId) {
    const orgBeaconModel = db.getModel("OrgBeacon");
    const beaconModel = db.getModel("Beacon");

    const beacons = await orgBeaconModel.find({ organizationId }).lean();

    for (let i = 0; i < beacons.length; i++) {
      const beacon = await beaconModel.findOne({
        deviceKey: beacons[i].deviceKey,
      });

      beacons[i].lastSeenDate = beacon ? beacon.lastSeenDate : null;
    }

    return beacons;
  }

  async getOrgBeaconById(id) {
    const orgBeaconModel = db.getModel("OrgBeacon");
    const beaconModel = db.getModel("Beacon");

    const orgbeacon = await orgBeaconModel.findById(id).lean();

    const beacon = await beaconModel.findOne({
      deviceKey: orgbeacon.deviceKey,
    });

    orgbeacon.lastSeenDate = beacon ? beacon.lastSeenDate : null;

    return orgbeacon;
  }

  async getOrgBeaconByKey(deviceKey) {
    const orgBeaconModel = db.getModel("OrgBeacon");
    const beaconModel = db.getModel("Beacon");

    const orgbeacon = await orgBeaconModel.findOne({ deviceKey }).lean();

    const beacon = await beaconModel.findOne({
      deviceKey: orgbeacon.deviceKey,
    });

    orgbeacon.lastSeenDate = beacon ? beacon.lastSeenDate : null;

    return orgbeacon;
  }

  async deleteOrgBeacon(id) {
    const orgBeaconModel = db.getModel("OrgBeacon");

    await orgBeaconModel.findByIdAndDelete(id);
  }

  async updateOrgBeacon(id, beacon) {
    const orgBeaconModel = db.getModel("OrgBeacon");

    await orgBeaconModel.findByIdAndUpdate(id, {
      name: beacon.name,
      desc: beacon.desc,
    });

    return await orgBeaconModel.findById(id).lean();
  }

  async getDevices(id) {
    const deviceModel = db.getModel("UserDevice");

    return await deviceModel.find({ organizationId: id }).lean();
  }
}

module.exports = new OrganizationController();
