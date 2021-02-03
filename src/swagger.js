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
                    example:  "5ff9c17a236b1f7080d2fde0"
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
        },
        Map: {
            type: "object",
            required: ["name", "beacons"],
            properties: {
                name: {
                    type: "string",
                    example: "Zahrada"
                },
                image: {
                    type: "string",
                    example: "1.png"
                },
                beacons: {
                    type: "array",
                    items: {
                        type: "object",
                        required: ["deviceKey", "x", "y"],
                        properties: {
                            deviceKey: {
                                type: "string",
                                example: "00000000fg5f6f00"
                            },
                            x: {
                                type: "number",
                                example: 500
                            },
                            y: {
                                type: "number",
                                example: 500
                            }
                        }
                    }
                }
            }
        }
    },
    paths: {
        "/ping": {
            get: {
                tags: ["test"],
                description: "",
                summary: "Ping http server",
                responses: {
                    200: {
                        schema: {
                            type: "object",
                            properties: {
                                time: {
                                    type: "string"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/data": {
            post: {
                tags: ["data endpoint"],
                summary: "Entry point for data from beacons",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["device_key"],
                                properties: {
                                    device_key: {
                                        type: "string",
                                        example: "c0:b6:f9:8e:87:6c"
                                    },
                                    devices: {
                                        type: "array",
                                        items: {
                                            $ref: "#/definitions/RSSIInfo"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/devices": {
            get: {
                tags: ["Devices"],
                summary: "get all devices"
            },
            post: {
                tags: ["Devices"],
                summary: "Add new device",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name", "mac", "userId"],
                                properties: {
                                    mac: {
                                        type: "string",
                                        example: "fc:95:40:35:dc:b5"
                                    },
                                    name: {
                                        type: "string",
                                        example: "telefon"
                                    },
                                    userId: {
                                        type: "string",
                                        example: "5ffcd0626270ec2da06d6586"
                                    },
                                }
                            }
                        }
                    }
                }
            }
        },
        "/localization": {
            post: {
                tags: ["Localization"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: [],
                                properties: {
                                    name: {
                                        type: "string",
                                        example: "Testovací lokalizace"
                                    },
                                    planId: {
                                        type: "string",
                                        example: "89464e948564784687"
                                    },
                                    type: {
                                        type: "string",
                                        example: "NEAREST_FINGERPRINT"
                                    },
                                    beacons: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                deviceKey: {
                                                    type: "string",
                                                    example: "89464e948564784687"
                                                },
                                                x: {
                                                    type: "number",
                                                    example: 0
                                                },
                                                y: {
                                                    type: "number",
                                                    example: 0
                                                },
                                                f: {
                                                    type: "number",
                                                    example: 0
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            get: {
                tags: ["Localization"]
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
            },
            delete: {
                tags: ["Localization"]
            }
        },
        "/localization/{id}/room": {
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
            post: {
                tags: ["Rooms"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name", "polygon", "f"],
                                properties: {
                                    name: {
                                        type: "string",
                                        example: "Obývací pokoj"
                                    },
                                    polygon: {
                                        type: "array",
                                        items: {
                                            type: "array",
                                            maxItems: 2,
                                            minItems: 2,
                                            items: {
                                                type: "number",
                                            },
                                            example: [0,0]
                                        }
                                    },
                                    f: {
                                        type: "number",
                                        example: 0
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/room/{roomId}": {
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
                tags: ["Rooms"],
            },
            delete: {
                tags: ["Rooms"],
            },
            put: {
                tags: ["Rooms"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name", "polygon", "f"],
                                properties: {
                                    name: {
                                        type: "string",
                                        example: "Obývací pokoj"
                                    },
                                    polygon: {
                                        type: "array",
                                        items: {
                                            type: "array",
                                            maxItems: 2,
                                            minItems: 2,
                                            items: {
                                                type: "number",
                                            },
                                            example: [0,0]
                                        }
                                    },
                                    f: {
                                        type: "number",
                                        example: 0
                                    }
                                }
                            }
                        }
                    }
                }
            },
        },
        "/localization/{id}/fingerprint/{mac}": {
            parameters: [
                {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "",
                    schema: {
                        type: "string"
                    }
                },
                {
                    name: "mac",
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
        "/localization/{id}/fingerprint": {
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
            post: {
                tags: ["Localization"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["mac", "beacons"],
                                properties: {
                                    x: {
                                        type: "number",
                                        example: 0
                                    },
                                    y: {
                                        type: "number",
                                        example: 0
                                    },
                                    f: {
                                        type: "number",
                                        example: 0
                                    },
                                    beacons: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            required: ["deviceKey", "rssi"],
                                            properties: {
                                                deviceKey: {
                                                    type: "string",
                                                    example: "absoihaop989"
                                                },
                                                rssi: {
                                                    type: "number",
                                                    example: -95
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/localization/{id}/beacons": {
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
            put: {
                tags: ["Localization"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: {
                                    type: "object",
                                    required: ["deviceKey", "x", "y", "f"],
                                    properties: {
                                        deviceKey: {
                                            type: "string",
                                            example: "Barák"
                                        },
                                        x: {
                                            type: "number",
                                            example: 0
                                        },
                                        y: {
                                            type: "number",
                                            example: 0
                                        },
                                        f: {
                                            type: "number",
                                            example: 0
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/plans": {
            get: {
                tags: ["Plans"]
            },
            post: {
                tags: ["Plans"],
                summary: "Create new plan",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name", "floors"],
                                properties: {
                                    name: {
                                        type: "string",
                                        example: "Barák"
                                    },
                                    floors: {
                                        type: "array",
                                        required: ["name", "image", "floor"],
                                        items: {
                                            type: "object",
                                            properties: {
                                                floor: {
                                                    type: "number",
                                                    example: 0
                                                },
                                                name: {
                                                    type: "string",
                                                    example: "přízemí"
                                                },
                                                image: {
                                                    type: "string",
                                                    example: "/img/map/4.png"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/plans/{id}": {
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
                tags: ["Plans"]
            },
            delete: {
                tags: ["Plans"]
            }
        },
        "/beacons": {
            get: {
                tags: ["Beacons"]
            },
            post: {
                tags: ["Beacons"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["deviceKey", "name", "desc"],
                                properties: {
                                    deviceKey: {
                                        type: "string",
                                        example: "Barák"
                                    },
                                    name: {
                                        type: "string",
                                        example: "Barák"
                                    },
                                    desc: {
                                        type: "string",
                                        example: "V kuchyni"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/beacons/{id}": {
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
                tags: ["Beacons"]
            },
            put: {
                tags: ["Beacons"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name", "desc"],
                                properties: {
                                    name: {
                                        type: "string",
                                        example: "Barák"
                                    },
                                    desc: {
                                        type: "string",
                                        example: "V kuchyni"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            delete: {
                tags: ["Beacons"]
            }
        },
        "/organization/people": {
            get: {
                tags: ["Organization"]
            }
        },
        "/organization/person/{id}": {
            get: {
                tags: ["Organization"]
            },
            delete: {
                tags: ["Organization"]
            }
        },
        "/organization/newInvitation": {
            get: {
                tags: ["Organization"]
            }
        },
    }
}
