const OrganizationController = require("../../controllers/OrganizationController")
const Time = require("../../utils/Time")
const LocalizationController = require("../../controllers/LocalizationController")

module.exports = {
    get: async (req, res) => {
        const beacons = await OrganizationController.getOrgBeacons(req.user.organization._id);
        const people = await OrganizationController.getAllPeopleWithLastActivity(req.user.organization._id)
        const localizations = await LocalizationController.getLocalizaionsOverallInfo(req.user.organization._id)

        const data = {
            "warnings": [],
            people,
            "localizations": localizations.filter(loc => Time.diffInSeconds(loc.date) <= 60).map(loc => {
                return {
                    _id: loc.data._id,
                    name: loc.data.name ?? "",
                    deviceCount: loc.data.devices.length ?? 0
                }
            }),
            "localizations2": localizations
        }

        data.warnings =beacons.filter(b => Time.diffInSeconds(b.lastSeenDate) > 60).map(b => "Maják \""+b.name+ "\" ("+b.desc+") je offline!")

        res.json(data)
    }
}