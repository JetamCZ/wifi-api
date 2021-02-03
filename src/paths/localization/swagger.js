module.exports = {
    definitions: {
        LocalizationGet: {
            type: "object",
            properties: {
                _id: {
                    type: "string",
                    example: "5ffcc2946270ec2da06d653e"
                },
                name: {
                    type: "string",
                    example: "5ffcc2946270ec2da06d653e"
                },
                planId: {
                    type: "string",
                    example: "5ff9da5f236b1f7080d2fdeb"
                },
                type: {
                    type: "string",
                    example: "NEAREST_FINGERPRINT"
                }
            }
        }
    },
    paths: {
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
    }
}