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
            deviceSave = await  this.model.findOne({mac: device.mac}).lean();
        }

        if(device.rssi < 0) {
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
    }

    async getAllDevices() {
        let devices = await this.model.find().sort({'lastSeenDate': -1}).lean()
        const promises = [];

        devices.forEach(device => {
            const promise = new Promise((resolve) => {
                device.vendor = oui(device.mac)
                db.getModel('LastSeen').find({deviceId: device._id}).then((lastSeens) => {
                    device.lastSeens = lastSeens || [];
                    resolve();
                })
            })

            promises.push(promise)
        })

        await Promise.all(promises);

        const names = await db.getModel('DeviceName').find({}).lean()

        devices = devices.map(dev => {
            if(!dev.name) {
                const nameObj = names.find(n => n.mac === dev.mac)
                dev.name = nameObj ? nameObj.name : ""
            }

            return dev
        })

        return devices;
    }

    async getByMac(mac) {
        const device = await this.model.findOne({mac}).lean()

        device.vendor = oui(device.mac)
        await db.getModel('LastSeen').find({deviceId: device._id}).lean().then((lastSeens) => {
            device.lastSeens = lastSeens || [];
        })

        for (let i = 0; i < device.lastSeens.length; i++) {
            device.lastSeens[i].name = (await BeaconController.getByDeviceKey(device.lastSeens[i].deviceKey)).name
        }

        if(!device.name) {
            device.name = await this.getNameByMac(device.mac)
        }

        return device;
    }

    async cleanupBeforeDay(date) {
        const devices = await this.model.find({
            'lastSeenDate': {$lt: date}
        }).lean()

        const devicesIds = devices.map(device => device._id)

        await db.getModel('LastSeen').deleteMany({deviceId: {$in: devicesIds}});
        await db.getModel('LastSeen').deleteMany({date: {$lt: date}});
        await this.model.deleteMany({'_id': {$in: devicesIds}})

        return devicesIds
    }

    async getNameByMac(mac) {
        const nameObj = await db.getModel('DeviceName').findOne({mac}).lean()

        return nameObj ? nameObj.name : ""
    }

    async setNameForMac(mac, name) {
        await db.getModel('DeviceName').updateOne({mac}, {
            mac,
            name
        }, {
            upsert: true,
            setDefaultsOnInsert: true
        })
    }
}
const BeaconController = require('../controllers/BeaconController')

module.exports = new DeviceController()