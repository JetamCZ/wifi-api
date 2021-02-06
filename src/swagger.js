module.exports = {
    openapi: "3.0.0",
    basePath: "/",
    info: {
        title: "Wifi localization API",
        version: "1.0.0"
    },
    definitions: {
        Beacon: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    example: "Beacon 18645458646"
                },
                deviceKey: {
                    type: "string",
                    example: "0000000fzugjkln"
                },
                organizationId: {
                    type: "string",
                    example: "565894516478"
                },
                desc: {
                    type: "string",
                    example: "desc"
                },
                lastSeenDate: {
                    type: "string",
                    example: "2021-02-01T22:57:41.539Z"
                },
                devices: {
                    type: "array",
                    items: {}
                }
            },
            required: ["name"]
        },
        RSSIInfo: {
            type: "object",
            required: ["rssi", "mac"],
            properties: {
                name: {
                    type: "string",
                    example: "Device 2125"
                },
                rssi: {
                    type: "number",
                    example: -10
                },
                mac: {
                    type: "string",
                    example: "c0:b6:f9:8e:87:6c"
                }
            }
        },
        BaseUser: {
            type: "object",
            required: ["name", "email"],
            properties: {
                name: {
                    type: "string",
                    example: "Matěj Půhoný",
                    minLength: 3
                },
                email: {
                    type: "string",
                    example: "info@puhony.eu",
                    format: "email"
                },
                organizationId: {
                    type: "string",
                    example: "5ff9c17a236b1f7080d2fde0"
                }
            }
        },
        UserDefault: {
            type: "object",
            properties: {
                _id: {
                    type: "string",
                    example: "5ffd51c84411eb4b040df3f9",
                    minLength: 3
                },
                name: {
                    type: "string",
                    example: "Matěj Půhoný",
                    minLength: 3
                },
                email: {
                    type: "string",
                    example: "info@puhony.eu",
                    format: "email"
                }
            }
        },
        OrganizationDefault: {
            type: "object",
            properties: {
                _id: {
                    type: "string",
                    example: "5ffd51c84411eb4b040df3f9",
                    minLength: 3
                },
                name: {
                    type: "string",
                    example: "Delta SŠIE"
                }
            }
        },
        RegisterUser: {
            type: "object",
            required: ["name", "invCode", "email", "password"],
            properties: {
                name: {
                    type: "string",
                    example: "Matěj Půhoný",
                    minLength: 3
                },
                invCode: {
                    type: "string",
                    example: "asigduiivhuogialew6f4684656489"
                },
                email: {
                    type: "string",
                    example: "info@puhony.eu",
                    format: "email"
                },
                password: {
                    type: "string",
                    example: "ABCD1234",
                    minLength: 4
                }
            }
        }
    },
    paths: {}
}
