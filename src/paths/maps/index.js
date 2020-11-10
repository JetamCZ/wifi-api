const MapController = require('../../controllers/MapController')

module.exports = {
    get: async (req, res) => {
        res.send(await MapController.getAll())
    },
    post: async (req, res) => {
        res.send(await MapController.create(req.body))
    }
}