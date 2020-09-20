const db = require('../db')

module.exports = {
    post: async (req, res) => {
        //const model = db.getModel('RSSIInfo')
        //const data = new model({name: "TEST"}).save()

        console.log(req.data, req.text)

        res.send(req.body)
    }
}