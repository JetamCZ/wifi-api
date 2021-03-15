const fs = require("fs")

class fr {
    recursiveReadSync(dir) {
        const allFiles = []

        const recursiveReading = (dir) => {
            const files = fs.readdirSync(dir)

            files.forEach((file) => {
                allFiles.push(dir + file)

                if (fs.lstatSync(dir + file).isDirectory()) {
                    recursiveReading(dir + file + "/")
                }
            })

            return files
        }

        recursiveReading(dir)

        return allFiles
    }

    getSwaggerFiles() {
        const files = this.recursiveReadSync("./src/paths/")
        return files.filter((file) => file.includes("swagger.js"))
    }

    getSwaggerMegaFile() {
        const mainFile = require("../../src/swagger")
        const swaggerAddMore = this.getSwaggerFiles()

        for (const file of swaggerAddMore) {
            const file_route = file.replace("./", "../../")
            const f = require(file_route)
            mainFile.paths = { ...mainFile.paths, ...f.paths }
            mainFile.definitions = { ...mainFile.definitions, ...f.definitions }
        }

        const fl = require("../autoSwagger/done.json")

        mainFile.paths = { ...mainFile.paths, ...fl }

        return this.censor(mainFile)
    }

    censor(object) {
        let censor = JSON.stringify(object)

        //Mac adressy
        censor = censor.replace(/([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})/g, "00:00:00:00:00:00")

        //Id objektů
        censor = censor.replace(/([0-9a-f]{24})/g, "000000000000000000000000")

        return JSON.parse(censor)
    }
}

module.exports = new fr()
