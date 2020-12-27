const UserController = require('../../controllers/UserController')

module.exports = {
    post: async (req, res) => {
        try {
            const jwt = await UserController.login(req.body.email, req.body.password)
            res.json(jwt)
        } catch (e) {
            res.status(400).json({

            })
        }
    }
}