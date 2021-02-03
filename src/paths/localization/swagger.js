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
                tags: ["Localization"],
                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {
                                    "type":"array",
                                    "items":{
                                        "type":"object",
                                        "properties":{
                                            "_id":{
                                                "type":"string",
                                                "example":"5ffcc2946270ec2da06d653e"
                                            },
                                            "name":{
                                                "type":"string",
                                                "example":"Demo"
                                            },
                                            "planId":{
                                                "type":"string",
                                                "example":"5ff9da5f236b1f7080d2fdeb"
                                            },
                                            "type":{
                                                " type":"string",
                                                "example":"NEAREST_FINGERPRINT"
                                            },
                                            "beacons":{
                                                "type":"array",
                                                "items":{
                                                    "type":"object",
                                                    "properties":{
                                                        "_id":{
                                                            "type":"string",
                                                            "example":"5ffcc2946270ec2da06d653f"
                                                        },
                                                        "deviceKey":{
                                                            "type":"string",
                                                            "example":"00000000c05f6f00"
                                                        },
                                                        "x":{
                                                            "type":"number",
                                                            "example":716
                                                        },
                                                        "y":{
                                                            "type":"number",
                                                            "example":60
                                                        },
                                                        "f":{
                                                            "type":"number",
                                                            "example":1
                                                        }
                                                    }
                                                }
                                            },
                                            "organizationId":{
                                                "type":"string",
                                                "example":"5ff9c17a236b1f7080d2fde0"
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
                tags: ["Localization"],
                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {
                                    "type":"object",
                                    "properties":{
                                        "_id":{
                                            "type":"string",
                                            "example":"5ffcc2946270ec2da06d653e"
                                        },
                                        "name":{
                                            "type":"string",
                                            "example":"Demo"
                                        },
                                        "type":{
                                            "type":"string",
                                            "example":"NEAREST_FINGERPRINT"
                                        },
                                        "beacons":{
                                            "type":"array",
                                            "items":{
                                                "type ":"object",
                                                "properties":{
                                                    "_id":{
                                                        "type":"string",
                                                        "example":"5ffcc2946270ec2da06d653f"
                                                    },
                                                    "deviceKey":{
                                                        "type":"string",
                                                        "example":"00000000c05f6f00"
                                                    },
                                                    "x":{
                                                        "type":"number",
                                                        "example":716
                                                    },
                                                    "y":{
                                                        "type":"number",
                                                        "example":60
                                                    },
                                                    "f":{
                                                        "type":"nu mber",
                                                        "example":1
                                                    },
                                                    "name":{
                                                        "type":"string",
                                                        "example":"Pokoj"
                                                    },
                                                    "desc":{
                                                        "type":"string",
                                                        "example":""
                                                    },
                                                    "lastSeenDate":{
                                                        "type":"string",
                                                        "example":"2021-02-01T22:57:41.539Z"
                                                    }
                                                }
                                            }
                                        },
                                        "organizationId":{
                                            "type":"string",
                                            "example":"5ff9c17a236b1 f7080d2fde0"
                                        },
                                        "devices":{
                                            "type":"array",
                                            "items":{
                                                "type":"object",
                                                "properties":{
                                                    "mac":{
                                                        "type":"string",
                                                        "example":"3c:dc:bc:97:f2:29"
                                                    },
                                                    "x":{
                                                        "type":"number",
                                                        "example":636.084330611517
                                                    },
                                                    "y":{
                                                        "type":"number",
                                                        "example":109.6875
                                                    },
                                                    "f":{
                                                        "ty pe":"number",
                                                        "example":1
                                                    },
                                                    "custom":{
                                                        "type":"object",
                                                        "properties":{
                                                            "fingerPrint":{
                                                                "type":"string",
                                                                "example":"601824973480fc1dbe5de6ef"
                                                            }
                                                        }
                                                    },
                                                    "rooms":{
                                                        "type":"array",
                                                        "items":{
                                                            "type":"object",
                                                            "properties":{
                                                                "_id":{
                                                                    "type":"string",
                                                                    "example ":"600ccd7b68a68a5798f6e8db"
                                                                },
                                                                "name":{
                                                                    "type":"string",
                                                                    "example":"Pokoj 2"
                                                                },
                                                                "f":{
                                                                    "type":"number",
                                                                    "example":1
                                                                },
                                                                "color":{
                                                                    "type":"string",
                                                                    "example":"#886C25"
                                                                }
                                                            }
                                                        }
                                                    },
                                                    "name":{
                                                        "type":"string",
                                                        "example":"Alenka"
                                                    }
                                                }
                                            }
                                        },
                                        "customLocalizationData":{
                                            "type":"object",
                                            "properties":{
                                                "caclulatingTimes":{
                                                    "type":"object",
                                                    "properties":{
                                                        "total":{
                                                            "type":"number",
                                                            "example":240
                                                        },
                                                        "date":{
                                                            "type":"string",
                                                            "example":"2021-02-03T16:03:50.400Z"
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        "plan":{
                                            "type":"object",
                                            "properties":{
                                                "_id":{
                                                    "type":"string",
                                                    "example":"5ff9da5f236b1f7080d2fdeb"
                                                },
                                                "floors":{
                                                    "type":"array",
                                                    "items":{
                                                        "type":"object",
                                                        "properties":{
                                                            "_id":{
                                                                "type":"string",
                                                                "example":"5ff9da5f236b1f7080d2fdec"
                                                            },
                                                            "name":{
                                                                "type":"string",
                                                                "example":"přízemí"
                                                            },
                                                            "image":{
                                                                "type":"string",
                                                                "example":"https://img-wifi.puhony.eu/plans/OEgBLNGTxvXkX0HCaIq3ZWeapKn3cCKU8FMhJjav1610209872470.png"
                                                            },
                                                            "floor":{
                                                                "type":"number",
                                                                "example":0
                                                            }
                                                        }
                                                    }
                                                },
                                                "name":{
                                                    "type":"string",
                                                    "example":"Barák"
                                                },
                                                "organizationId":{
                                                    "type":"string",
                                                    "example":"5ff9c17a236b1f7080d2fde0"
                                                }
                                            }
                                        },
                                        "rooms":{
                                            "type":"array",
                                            "items":{
                                                "type":"object",
                                                "properties":{
                                                    "_id":{
                                                        "type":"string",
                                                        "example":"600c802f64f8c313fc539163"
                                                    },
                                                    "polygon":{
                                                        "type":"array",
                                                        "items":{
                                                            "type":"array",
                                                            "items":{
                                                                "type":"number",
                                                                "example":688
                                                            }
                                                        }
                                                    },
                                                    "name":{
                                                        "type":"string",
                                                        "example":"Pokoj"
                                                    },
                                                    "localizationId":{
                                                        "type":"string",
                                                        "example":"5ffcc2946270ec2da06d653e"
                                                    },
                                                    "f":{
                                                        "type":"number",
                                                        "example":1
                                                    },
                                                    "color":{
                                                        "type":"string",
                                                        "example":"#32a852"
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
    }
}