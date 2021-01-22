const CronJob = require('cron').CronJob;
const LocalizationController = require('../controllers/LocalizationController')
const MeetController = require('../controllers/MeetController')

class Crons {
    init(socket) {
        //Cron Every 5minutes
        const clearOldDataJob = new CronJob('0 */5 * * * *', async () => {
            console.log('CRON', 'CLEANUP')

            const date = new Date();
            date.setHours(date.getHours() - 1)
            await MeetController.cleanupBeforeDay(date);

        }, null, true, 'Europe/Prague')

        clearOldDataJob.start()

        //Cron Every 5seconds
        const localizationComputes = new CronJob('*/5 * * * * *', async () => {
            const start = new Date()
            console.log('CRON', 'Compute locations')

            await LocalizationController.localizeAll(socket)

            console.log('Computed all locations: '+ (new Date() - start)+"ms.")
        }, null, true, 'Europe/Prague')

        localizationComputes.start()
    }
}

module.exports = new Crons