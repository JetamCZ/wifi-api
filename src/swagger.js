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
                    items: {

                    }
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
                },
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
                    example: "Delta SŠIE",
                },
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
    paths: {
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
