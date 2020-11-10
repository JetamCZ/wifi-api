const MapController = require('../../controllers/MapController')

module.exports = {
    get: async (req, res) => {
        res.send(await MapController.getMapById(req.params.id))
    },
    put: async (req, res) => {
        res.send(await MapController.update(req.params.id, req.body))
    }
}