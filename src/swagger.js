module.exports = {
    "openapi": "3.0.0",
    basePath: '/',
    info: {
        title: 'Wifi localization API',
        version: '1.0.0'
    },
    definitions: {
        Beacon: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'Beacon 18645458646'
                }
            },
            required: ['name']
        },
        RSSIInfo: {
            type: 'object',
            required: [
                'rssi', 'mac'
            ],
            properties: {
                name: {
                    type: 'string',
                    example: 'Device 2125'
                },
                rssi: {
                    type: 'number',
                    example: -10
                },
                mac: {
                    type: 'string',
                    example: 'c0:b6:f9:8e:87:6c'
                }
            }
        },
        RegisterUser: {
            type: 'object',
            required: [
              "name", "invCode", "email", "password",
            ],
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
                    format: 'email'

                },
                password: {
                    type: "string",
                    example: "ABCD1234",
                    minLength: 4
                }
            }
        },
        Map: {
            type: 'object',
            required: [
                'name', 'beacons'
            ],
            properties: {
                name: {
                    type: 'string',
                    example: 'Zahrada'
                },
                image: {
                    type: 'string',
                    example: '1.png'
                },
                beacons: {
                    type: 'array',
                    items: {
                        type: 'object',
                        required: [
                            'deviceKey', 'x', 'y'
                        ],
                        properties: {
                            deviceKey: {
                                type: 'string',
                                example: '00000000fg5f6f00'
                            },
                            x: {
                                type: 'number',
                                example: 500
                            },
                            y: {
                                type: 'number',
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
                        "description": "pet response",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "time": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/beacon": {
            post: {
                tags: ["data endpoint"],
                summary: "Entry point for data from beacons",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: 'object',
                                required: [
                                    'device_key'
                                ],
                                properties: {
                                    'device_key': {
                                        type: 'string',
                                        example: 'c0:b6:f9:8e:87:6c'
                                    },
                                    'devices': {
                                        type: 'array',
                                        items: {
                                            "$ref": "#/definitions/RSSIInfo"
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
                tags: ['Devices'],
                summary: "get all devices",
            }
        },
        "/devices/{macAddress}": {
            parameters: [
                {
                    name: "macAddress",
                    in: "macAddress",
                    required: true,
                    description: "",
                    schema: {
                        type: "string"
                    }
                }
            ],
            get: {
                tags: ['Devices'],
                summary: "get data for mac address",
            },
            post: {
                tags: ['Devices'],
                summary: "set device name",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: 'object',
                                required: [
                                    'name'
                                ],
                                properties: {
                                    'name': {
                                        type: 'string',
                                        example: 'Ant4'
                                    },
                                }
                            }
                        }
                    }
                }
            }
        },
        "/maps": {
            get: {
                tags: ['Maps'],
                summary: "get all maps",
            },
            post: {
                tags: ['Maps'],
                summary: "create map",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                "$ref": "#/definitions/Map"
                            }
                        }
                    }
                }
            }
        },
        "/organization/person/{id}/device": {
            parameters: [
                {
                    name: "id",
                    in: "id",
                    required: true,
                    description: "",
                    schema: {
                        type: "string"
                    }
                }
            ],
            post: {
                tags: ['Devices'],
                summary: "Add new device",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: 'object',
                                required: [
                                    'name', 'mac'
                                ],
                                properties: {
                                    'mac': {
                                        type: 'string',
                                        example: 'fc:95:40:35:dc:b5',
                                    },
                                    'name': {
                                        type: 'string',
                                        example: 'telefon',
                                    },
                                }
                            }
                        }
                    }
                }
            }
        },
        "/auth/register": {
            post: {
                tags: ['Users'],
                summary: "Create new user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                "$ref": "#/definitions/RegisterUser"
                            }
                        }
                    }
                }
            }
        },
        "/auth/login": {
            post: {
                tags: ['Users'],
                summary: "User Login",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: 'object',
                                required: [
                                    'email', 'password'
                                ],
                                properties: {
                                    'email': {
                                        type: 'string',
                                        example: 'info@puhony.eu',
                                    },
                                    'password': {
                                        type: 'string',
                                        example: 'priliszlutouckykunupeldabelskeody',
                                    },
                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Successfull login",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "string",
                                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/auth/create-org": {
            post: {
                tags: ['Users'],
                summary: "Create new organization",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: 'object',
                                required: [
                                    'name'
                                ],
                                properties: {
                                    'name': {
                                        type: 'string',
                                        example: 'Ant4',
                                        minLength: 3
                                    },
                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Successfull login",
                        content: {
                            "application/json": {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        '_id': {
                                            type: 'string',
                                            example: '5fcf53f1af1ccc7390ae45df'
                                        },
                                        'name': {
                                            type: 'string',
                                            example: 'Ant4',
                                            minLength: 3
                                        },
                                        'invCode': {
                                            type: 'string',
                                            example: 'lwxrutbNp4O56TZbbKo',
                                        },
                                        'created': {
                                            type: 'string',
                                            example: '2020-12-08T10:19:50.244Z',
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
}