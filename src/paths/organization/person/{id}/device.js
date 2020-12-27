const UserController = require('../../../../controllers/UserController')

module.exports = {
    post: async (req, res) => {
        try{
            const device = await UserController.addDevice(req.user.organization._id, req.user.user._id, req.body.mac, req.body.name)
            res.json(device)
        } catch (e) {
            res.status(400).send()
        }
    }
}