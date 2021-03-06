module.exports = {
    "/ping": {
        get: {
            tags: ["Data entry"]
        }
    },
    "/localization/{id}": {
        parameters: [
            {
                name: "id",
                in: "path",
                required: true,
                description: "",
                schema: {
                    type: "string"
                }
            }
        ],
        get: {
            tags: ["Localization"]
        }
    },
    "/devices/{id}": {
        parameters: [
            {
                name: "id",
                in: "path",
                required: true,
                description: "",
                schema: {
                    type: "string"
                }
            }
        ],
        get: {
            tags: ["Devices"]
        }
    },
    /*
    "/localization": {
        get: {
            tags: ["Localization"]
        }
    },*/
    "/localization/{id}": {
        parameters: [
            {
                name: "id",
                in: "path",
                required: true,
                description: "",
                schema: {
                    type: "string"
                }
            }
        ],
        get: {
            tags: ["Localization"]
        }
    },
    "/history/beacons": {
        get: {
            tags: ["History"]
        }
    },
    "/history/localization/{id}": {
        parameters: [
            {
                name: "id",
                in: "path",
                required: true,
                description: "",
                schema: {
                    type: "string"
                }
            }
        ],
        get: {
            tags: ["History"]
        }
    },
    "/organization/now": {
        get: {
            tags: ["Organization"]
        }
    }
}
