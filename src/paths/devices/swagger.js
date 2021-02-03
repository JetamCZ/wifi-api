module.exports = {
    definitions: {
        Device: {
            type: "object",
            required: ["name", "email"],
            properties: {
                _id: {
                    type: "string",
                    example: "5ffd51c84411eb4b040df3f9",
                    minLength: 3
                },
                organizationId: {
                    type: "string",
                    example: "5ff9c17a236b1f7080d2fde0",
                },
                userId: {
                    type: "string",
                    example: "5ff9c17a236b1f7080d2fde0",
                },
                mac: {
                    type: "string",
                    example: "58:00:00:00:00:00",
                },
                name: {
                    type: "string",
                    example: "NTB",
                },
                user: {
                    $ref: "#/definitions/UserDefault"
                },
                "lastSeenDate": {
                    type: "string",
                    example: "2021-02-03T13:41:39.670Z"
                }
            }
        },
    },
    paths: {
        "/devices": {
            get: {
                tags: ["Devices"],
                summary: "get all devices",
                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/definitions/Device"
                                }
                            }
                        }
                    }
                }
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
            delete: {
                tags: ["Devices"]
            }
        }
    }
}