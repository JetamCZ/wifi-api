const ImageController = require("../../controllers/ImageController")
const fs = require("fs")
const formidable = require("formidable")

module.exports = {
    post: async (req, res) => {
        const form = formidable({ multiples: true })

        form.parse(req, async (err, fields, files) => {
            const file = files.img

            const uploadedFile = await ImageController.upload(file, "temp")

            res.json(uploadedFile)
            fs.unlinkSync(file.path)
        })
    }
}
