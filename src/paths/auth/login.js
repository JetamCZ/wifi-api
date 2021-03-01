const UserController = require("../../controllers/UserController")
const Queue = require('../../utils/queue')

module.exports = {
    post: (req, res) => {
        Queue.queue("login", async () => {
            try {
                const jwt = await UserController.login(req.body.email, req.body.password)
                res.json(jwt)
            } catch (e) {
                res.status(400).json({})
            }
        })
    }
}
