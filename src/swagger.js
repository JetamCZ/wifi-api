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
        "/devices/{macAddress}": {
            get: {
                tags: ['data endpoint'],
                summary: "get data for mac address",
                parameters: [
                    {
                        name: "macAddress",
                        in: "macAddress",
                        required: true,
                        description: "The id of the pet to retrieve",
                        schema: {
                            type: "string"
                        }
                    }
                ],
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
        }
    }
}