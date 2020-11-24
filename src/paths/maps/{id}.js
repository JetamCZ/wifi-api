const MapController = require('../../controllers/MapController')

module.exports = {
    get: async (req, res) => {
        res.send(await MapController.getMapById(req.params.id))
    },
    patch: async (req, res) => {
        res.send(await MapController.update(req.params.id, req.body))
    },
    delete: async (req, res) => {
        await MapController.delete(req.params.id)
        res.send()
    },
    put: async (req, res) => {
        console.log(req.body)
        await MapController.savePrint(req.params.id, req.body)
        res.send()
    }
}