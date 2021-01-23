const RoomController = require('../../../controllers/RoomController')

module.exports = {
    post: async (req, res) =>{
        const room = await RoomController.createNewRoom(req.params.id, req.body)

        res.json(room)
    }
}