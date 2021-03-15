require("dotenv").config()
const Axios = require("axios")
const getTypes = require("./getTypes")
const fs = require("fs")
const fr = require("../utils/fr")

const endpoints = require("./endpointsToAutoSwag")

const token = process.env.AUTOSWAG_TOKEN

const replacePaths = {
    "/localization/{id}": "/localization/60206249b697774c304f8318",
    "/devices/{id}": "/devices/6020ecfb080fc40564914fb0",
    "/history/localization/{id}": "/history/localization/6045e5863f7a480238804be5"
}

try {
    console.log("TOKEN: "+token)

    new Promise(async () => {
        for (const [key, value] of Object.entries(endpoints)) {
            let path = key

            if (replacePaths[key]) {
                path = replacePaths[key]
            }

            console.log(process.env.OWN_URL + path)

            const { data } = await Axios.get(process.env.OWN_URL + path, {
                timeout: 20 * 1000,
                headers: {
                    Authorization: "Bearer " + token
                }
            })

            console.log(process.env.OWN_URL + path, "DONE")

            value.get.responses = {
                200: {
                    content: {
                        "application/json": {
                            schema: getTypes(data)
                        }
                    }
                }
            }
        }

        const text = JSON.stringify(fr.censor(endpoints), null, " ")
        fs.writeFileSync("./src/autoSwagger/done.json", text)
    })
} catch (err) {
    console.log("ERR", err)
}
