const db = require('../db')

module.exports = {
    post: async (req, res) => {
        //const model = db.getModel('RSSIInfo')
        //const data = new model({name: "TEST"}).save()

        console.log(req)

        res.send(req.body)
    }
}