const db = require("../db");

class HistoryController {
    constructor() {
        this.beaconHistoryModel = db.getModel("HistoryBeacon")
    }

    async mapBeacons() {
        this.orgBeaconModel = db.getModel("OrgBeacon")
        this.beaconModel = db.getModel("Beacon")

        const orgBeacons = await this.orgBeaconModel.find().lean()
        const beacons = await this.beaconModel.find().lean()

        //console.log(orgBeacons, beacons)

        const activityThreshold = new Date()
        activityThreshold.setSeconds(activityThreshold.getSeconds() - 30)

        for(const orgBeacon of orgBeacons) {
            const beaconActive = beacons.find(b => b.deviceKey === orgBeacon.deviceKey)?.lastSeenDate >= activityThreshold ?? false

            await this.saveStateBeacon(orgBeacon._id, beaconActive)
        }
    }

    async saveStateBeacon(orgBeaconId, online) {
        const lastHistory = await this.beaconHistoryModel.findOne({orgBeaconId}, {}, {sort: {"date": 1}}).lean()

        if(!lastHistory|| (lastHistory?.active !== online)) {
            console.log(lastHistory, lastHistory?.active, online)

            await new this.beaconHistoryModel({
                orgBeaconId,
                date: new Date(),
                active: online
            }).save()
        }
    }

    async getOrgBeaconHistory(organizationId) {
        this.orgBeaconModel = db.getModel("OrgBeacon")

        const orgBeacons = await this.orgBeaconModel.find({organizationId}).lean()

        const history = await this.beaconHistoryModel.find({
            orgBeaconId: {$in: orgBeacons.map(b => b._id)}
        }, [], {
            sort: {"date": 1}
        }).lean()

        //groupBy
        const groups = {};
        for(const action of history) {
            if(!groups[action.orgBeaconId]) {
                groups[action.orgBeaconId] = {
                    beacon: orgBeacons.find(b => b._id.toString() === action.orgBeaconId) ??  {},
                    actions: []
                }
            }

            groups[action.orgBeaconId].actions.push(action)

            delete action._id
            delete action.orgBeaconId
        }

        for(const [key, value] of Object.entries(groups)) {
            const events = []
            let event = null

            for(const action of value.actions) {
                if(action.active && !event) {
                    event = {
                        from: action.date
                    }
                }
                if(!action.active && event) {
                    events.push({
                        ...event,
                        to: action.date
                    })
                    event = null
                }
            }
            if(event) {
                events.push({
                    ...event,
                    to: new Date()
                })
                event = null
            }

            value.activities = events
            delete value.actions
        }

        const result = Object.entries(groups).map((item) => {
            return {
                beacon: item[1].beacon,
                activities: item[1].activities
            }
        })

        return result
    }


    //TODO Remove old data (after 2 months)
}

module.exports = new HistoryController()