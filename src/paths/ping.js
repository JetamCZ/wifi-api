module.exports = {
    get: (req, res) => {
        res.send({
            time: new Date().getTime()
        })
    }
}
