const db = require('../db')
const oui = require('oui')

class DeviceController {
    constructor() {
        this.model = db.getModel('Device')
    }

    async saveInfo(dKey, device) {
        const deviceData = {
            mac: device.mac,
            lastSeenDate: new Date(),
        };

        if(device.name) {
            deviceData.name = device.name;
        }

        let deviceSave = await this.model.findOneAndUpdate({mac: device.mac}, deviceData, {
            upsert: true,
            setDefaultsOnInsert: true,
        }).lean()

        if(!deviceSave) {
            console.log('unknown')
            deviceSave = await  this.model.findOne({mac: device.mac}).lean();
        }

        await db.getModel('LastSeen').updateOne({deviceId: deviceSave._id, deviceKey: dKey}, {
            deviceId: deviceSave._id,
            date: new Date(),
            rssi: device.rssi,
            deviceKey: dKey,
        }, {
            upsert: true,
            setDefaultsOnInsert: true
        })
    }

    async getAllDevices() {
        const devices = await this.model.find().sort({'lastSeenDate': -1}).lean()
        const promises = [];

        devices.forEach(device => {
            const promise = new Promise((resolve) => {
                device.vendor = oui(device.mac)
                db.getModel('LastSeen').find({deviceId: device._id}).then((lastSeens) => {
                    device.lastSeens = lastSeens;
                    resolve();
                })
            })

            promises.push(promise)
        })

        await Promise.all(promises);

        return devices;
    }
}

module.exports = new DeviceController()