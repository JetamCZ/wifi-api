module.exports = {
    get: (req, res) => {
        res.json(req.user)
    }
}
