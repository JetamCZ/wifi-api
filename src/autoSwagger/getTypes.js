const getType = require("get-object-type")

const getTypes = (obj) => {
    let res = null

    switch (getType(obj)) {
        case "Object":
            res = {
                type: "object",
                properties: {}
            }

            for (const [key, value] of Object.entries(obj)) {
                res.properties[key] = getTypes(value)
            }
            break
        case "Array":
            res = {
                type: "array",
                items: obj[0] ? getTypes(obj[0]) : {}
            }
            break
        case "Number":
            res = {
                type: "number",
                example: obj
            }
            break
        case "String":
            res = {
                type: "string",
                example: obj
            }
            break
        default:
            throw new Error("Unknown type")
            break
    }

    return res
}

module.exports = getTypes
