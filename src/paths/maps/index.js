const types = {
    NEAREST_FINGERPRINT: 0
}

module.exports = {
    get: async (req, res) => {
        res.json([
            {
                "name": "Testovací barák",
                "type": types.NEAREST_FINGERPRINT,
                "plan": ''
            }
            ])
    },
    post: async (req, res) => {
        res.send(await MapController.create(req.body))
    }
}