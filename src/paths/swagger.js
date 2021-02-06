module.exports = {
    definitions: {},
    paths: {
        "/check-logged": {
            get: {
                tags: ["Auth"],
                summary: "Check bearer token",
                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        user: {
                                            $ref: "#/definitions/UserDefault"
                                        },
                                        organization: {
                                            $ref: "#/definitions/OrganizationDefault"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/data": {
            post: {
                tags: ["Data entry"],
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
                },
                responses: {
                    202: {
                        description: "Data saved"
                    }
                }
            }
        },
        "/ping": {
            get: {
                tags: ["Data entry"],
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
        }
    }
}
