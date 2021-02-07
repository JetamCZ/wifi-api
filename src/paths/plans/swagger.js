module.exports = {
    definitions: {},
    paths: {
        "/plans": {
            get: {
                tags: ["Plans"],
                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            _id: {
                                                type: "string",
                                                example: "5ff9da5f236b1f7080d2fdeb"
                                            },
                                            floors: {
                                                type: "array",
                                                items: {
                                                    type: "object",
                                                    properties: {
                                                        _id: {
                                                            type: "string",
                                                            example: "5ff9da5f236b1f708 0d2fdec"
                                                        },
                                                        name: {
                                                            type: "string",
                                                            example: "přízemí"
                                                        },
                                                        image: {
                                                            type: "string",
                                                            example:
                                                                "https://img-wifi.puhony.eu/plans/OEgBLNGTxvXkX0HCaIq3ZWeapKn3cCKU8FMhJjav1610209872470.png"
                                                        },
                                                        floor: {
                                                            type: "number",
                                                            example: 0
                                                        }
                                                    }
                                                }
                                            },
                                            name: {
                                                type: "string",
                                                example: "Barák"
                                            },
                                            organizationId: {
                                                type: "string",
                                                example: "5ff9c17a236b1f7080d2fde0"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
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
                tags: ["Plans"],
                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        _id: {
                                            type: "string",
                                            example: "5ff9da5f236b1f7080d2fdeb"
                                        },
                                        floors: {
                                            type: "array",
                                            items: {
                                                type: "object",
                                                properties: {
                                                    _id: {
                                                        type: "string",
                                                        example: "5ff9da5f236b1f7080d2fdec"
                                                    },
                                                    name: {
                                                        type: "string",
                                                        example: "přízemí"
                                                    },
                                                    image: {
                                                        type: "string",
                                                        example:
                                                            "https://img-wifi.puhony.eu/plans/OEgBLNGTxvXkX0HCaIq3ZWeapKn3cCKU8FMhJjav1610209872470.png"
                                                    },
                                                    floor: {
                                                        type: "number",
                                                        example: 0
                                                    }
                                                }
                                            }
                                        },
                                        name: {
                                            type: "string",
                                            example: "Barák"
                                        },
                                        organizationId: {
                                            type: "string",
                                            example: "5ff9c17a236b1f7080d2fde0"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            put: {
                tags: ["Plans"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name"],
                                properties: {
                                    name: {
                                        type: "string",
                                        example: "Barák"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            delete: {
                tags: ["Plans"]
            }
        }
    }
}
