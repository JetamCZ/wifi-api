const Axios = require("axios")
const fr = require('../src/utils/fr')
const getType = require('get-object-type');

const swagger = fr.getSwaggerMegaFile()

//console.log(swagger)

const getTypeS = (obj) => {
    let res = null

    switch (getType(obj)) {
        case "Object":
            res = {
                type: "object",
                properties: {},
            }

            for (const [key, value] of Object.entries(obj)) {
                res.properties[key] = getTypeS(value)
            }
            break;
        case "Array":
            res = {
                type: "array",
                items: obj[0] ? getTypeS(obj[0]) : {},
            }
            break;
        case "Number":
            res = {
                type: "number",
                example: obj
            }
            break;
        case "String":
            res = {
                type: "string",
                example: obj
            }
            break;
        default:
            //throw error
            res = {
                type: "unknown",
                data: obj
            }
            break;
    }

    return res
}

for (const pathName in swagger.paths) {
    const path = swagger.paths[pathName]

    if (path.get) {
        Axios.get("http://localhost:8000" + pathName, {
            headers: {
                Authorization: "Bearer " +
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmZjljMWQwMjM2YjFmNzA4MGQyZmRlMiIsImVtYWlsIjoiZEBkIiwibmFtZSI6IkthcmVsIE5vdsOhayJ9LCJvcmdhbml6YXRpb24iOnsiX2lkIjoiNWZmOWMxN2EyMzZiMWY3MDgwZDJmZGUwIiwibmFtZSI6IkRFTFRBIFPFoElFIn0sImlhdCI6MTYxMjM1NjMxMSwiZXhwIjoxNjEyNDQyNzExfQ.tKcWqQ2br1e4sNhh3DvWGpFV2-W64BCC9cg4sypX26o"
            }
        })
            .then((res) => {
                console.log("GET " + pathName)
                console.log(getTypeS(res.data))
            })
            .catch((err) => {
                //console.log(err)
            })
    }
}