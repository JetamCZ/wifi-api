require("dotenv").config()
const uncaught = require("uncaught")
const CronJob = require("cron").CronJob
const HistoryController = require("./controllers/HistoryController")

uncaught.start()
uncaught.addListener(function (error) {
    console.error("Uncaught error or rejection: ", error.message)
})

const beaconsHistory = new CronJob(
    "0,30 * * * * *",
    async () => {
        console.log('History beacons mapping', new Date().toString())

        await HistoryController.mapBeacons()
    },
    null,
    true,
    "Europe/Prague"
)

beaconsHistory.start()