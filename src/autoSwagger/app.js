require("dotenv").config()
const Axios = require("axios")
const getTypes = require("./getTypes")
const fs = require("fs")

const endpoints = require("./endpointsToAutoSwag")

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZjljMWQwMjM2YjFmNzA4MGQyZmRlMiIsImVtYWlsIjoiZEBkIiwibmFtZSI6IkthcmVsIE5vdsOhayJ9LCJvcmdhbml6YXRpb24iOnsiX2lkIjoiNWZmOWMxN2EyMzZiMWY3MDgwZDJmZGUwIiwibmFtZSI6IkRFTFRBIFPFoElFIn0sImlhdCI6MTYxMjE5MDk1OSwiZXhwIjoxNjEzMDU0OTU5fQ.-d7WwVHf-KHUXY59moSiHm_FfwNA4Q0NqHQugiCsiPE"

const replacePaths = {
    "/localization/{id}": "/localization/5ffcc2946270ec2da06d653e",
    "/devices/{id}": "/devices/5ffd51c84411eb4b040df3f9",
    "/history/localization/{id}": "/history/localization/5ffcc2946270ec2da06d653e"
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
