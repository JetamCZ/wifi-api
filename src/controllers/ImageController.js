const ftp = require("basic-ftp")
const Random = require("../utils/Random")
const Queue = require("../utils/queue")

class ImageController {
    constructor() {
        this.client = null

        this.running = false
        this.queue = []
    }

    async upload(file, folder) {
        return new Promise((resolve, reject) => {
            Queue.queue("FTP", async () => {
                const extension = file.name.split(".").pop()
                const newPath = folder + "/" + Random.randomString(40) + new Date().getTime() + "." + extension

                const client = await this.getClient()

                await client.uploadFrom(file.path, newPath)

                resolve(process.env.IMG_FILE_SERVER + newPath)
            })
        })
    }

    async moveFromTemp(filePath) {
        return new Promise((resolve, reject) => {
            Queue.queue("FTP", async () => {
                const client = await this.getClient()

                filePath = filePath.replace(process.env.IMG_FILE_SERVER, "")
                const filePathNew = filePath.replace("temp/", "plans/")

                await client.rename(filePath, filePathNew)

                resolve(process.env.IMG_FILE_SERVER + filePathNew)
            })
        })
    }

    async delete(filePath) {
        return new Promise((resolve, reject) => {
            Queue.queue("FTP", async () => {
                const client = await this.getClient()

                filePath = filePath.replace(process.env.IMG_FILE_SERVER, "")

                await client.remove(filePath)

                resolve()
            })
        })
    }

    async getClient() {
        if (!this.client) {
            await this.connect()
        } else {
            try {
                await this.client.list()
            } catch (err) {
                await this.disconnect()
                await this.connect()
            }
        }

        return this.client
    }

    async connect() {
        const client = new ftp.Client()

        try {
            await client.access({
                host: "152490.w90.wedos.net",
                user: "w152490_wifiImg",
                password: "SCuAwHNb",
                secure: true
            })

            client.trackProgress((info) => {
                console.log(
                    "File",
                    info.name,
                    info.bytes,
                    info.bytesOverall,
                    Math.floor((info.bytes / info.bytesOverall) * 100) + "%"
                )
            })

            await client.list()

            this.client = client
        } catch (err) {
            console.log(err)
        }
    }

    async disconnect() {
        this.client.close()
        this.client = null
    }
}

module.exports = new ImageController()
