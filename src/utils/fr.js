const fs = require('fs');

class fr {
    recursiveReadSync(dir) {
        const allFiles = []

        const recursiveReading = (dir) => {
            const files = fs.readdirSync(dir);

            files.forEach(file => {
                allFiles.push(dir+file)

                if(fs.lstatSync(dir+file).isDirectory()) {
                    recursiveReading(dir+file+"/")
                }
            })

            return files
        }

        recursiveReading(dir)

        return allFiles
    }

    getSwaggerFiles() {
        const files = this.recursiveReadSync('./src/paths/')
        return files.filter(file => file.includes('swagger.js'))
    }

    getSwaggerMegaFile() {
        const mainFile = require('../../src/swagger')
        const swaggerAddMore = this.getSwaggerFiles()

        for(const file of swaggerAddMore) {
            const file_route = file.replace('./', '../../')
            const f = require(file_route)
            mainFile.paths = {...mainFile.paths, ...f.paths}
            mainFile.definitions = {...mainFile.definitions, ...f.definitions}
        }

        return mainFile
    }
}

module.exports = new fr()