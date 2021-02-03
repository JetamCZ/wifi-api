module.exports = {
    definitions: {

    },
    paths: {
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
                tags: ["Beacons"],
                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/Beacon"
                                }
                            }
                        }
                    }
                }
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
                },
                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/Beacon"
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
    }
}