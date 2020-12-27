const UserController = require('../../controllers/UserController')

module.exports = {
    post: async (req, res) => {
        const user = await UserController.register(req.body.invCode, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })

        delete user._id
        delete user.__v

        const token = await UserController.login(req.body.email, req.body.password)

        res.json({user, token})
    }
}