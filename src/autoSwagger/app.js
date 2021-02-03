require("dotenv").config()
const Axios = require("axios")
const getTypes = require('./getTypes');
const fs = require('fs')

const endpoints = require('./endpointsToAutoSwag')

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZjljMWQwMjM2YjFmNzA4MGQyZmRlMiIsImVtYWlsIjoiZEBkIiwibmFtZSI6IkthcmVsIE5vdsOhayJ9LCJvcmdhbml6YXRpb24iOnsiX2lkIjoiNWZmOWMxN2EyMzZiMWY3MDgwZDJmZGUwIiwibmFtZSI6IkRFTFRBIFPFoElFIn0sImlhdCI6MTYxMjM1NjMxMSwiZXhwIjoxNjEyNDQyNzExfQ.tKcWqQ2br1e4sNhh3DvWGpFV2-W64BCC9cg4sypX26o";

const replacePaths = {
    "/localization/{id}": "/localization/5ffcc2946270ec2da06d653e",
    "/devices/{id}": "/devices/5ffd51c84411eb4b040df3f9"
}

try {
    new Promise(async () => {
        for(const [key, value] of Object.entries(endpoints)) {
            let path = key

            if(replacePaths[key]) {
                path = replacePaths[key]
            }

            console.log(process.env.OWN_URL+path)

            const {data} = await Axios.get(process.env.OWN_URL+path, {
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

        fs.writeFileSync('./src/autoSwagger/done.json', JSON.stringify(endpoints, null, " "));
    })
} catch (err) {
    console.log("ERR", err)
}