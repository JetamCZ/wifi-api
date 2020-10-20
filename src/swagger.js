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
    }
}