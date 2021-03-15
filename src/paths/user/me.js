const UserController = require("../../controllers/UserController")

module.exports = {
    put: async (req, res) => {
        try {
            await UserController.updateUser(req.user.user._id, req.body.name, req.body.email)

            const user = await UserController.getUser(req.user.user._id)

            res.json({
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name
                }
            })
        } catch (e) {
            res.status(400).json({
                error: "UNIQUE",
                message: "Your email is not unique"
            })
        }

    }
}