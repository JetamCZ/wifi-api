require("dotenv").config()
const Axios = require("axios")
const getTypes = require("./getTypes")
const fs = require("fs")

const endpoints = require("./endpointsToAutoSwag")

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwMWZlZjk2MGJmNzk4MThkOGRhMzQ2ZiIsImVtYWlsIjoibUBtIiwibmFtZSI6Ik1hdMSbaiBQxa9ob27DvSJ9LCJvcmdhbml6YXRpb24iOnsiX2lkIjoiNjAxZmVmODYwYmY3OTgxOGQ4ZGEzNDZkIiwibmFtZSI6Ik9TSUNFIn0sImlhdCI6MTYxNDYxNDkxNywiZXhwIjoxNjE1NDc4OTE3fQ.DM3bETt28CieZ5rZxZWZLy0R_44AgdVM_T8KyQ3nIoE"


const replacePaths = {
    "/localization/{id}": "/localization/60206249b697774c304f8318",
    "/devices/{id}": "/devices/6020ecfb080fc40564914fb0",
    "/history/localization/{id}": "/history/localization/60206249b697774c304f8318"
}

try {
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

        let text = JSON.stringify(endpoints, null, " ")

        /*
        text = text.toString()
            .replaceAll(/..\:..\:..\:..\:..\:../gm, "00:00:00:00:00:00")

        console.log(typeof text)

         */

        fs.writeFileSync("./src/autoSwagger/done.json", text)
    })
} catch (err) {
    console.log("ERR", err)
}
