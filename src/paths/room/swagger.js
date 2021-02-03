module.exports = {
    definitions: {

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
                responses: {
                    200: {
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
    }
}