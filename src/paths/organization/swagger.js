module.exports = {
    definitions: {

    },
    paths: {
        "/organization/newInvitation": {
            get: {
                tags: ["Auth"],
                summary: "Získání nové pozvánky do organizace",
                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {"type":"string","example":"Pl2htDQHg41IdsZ9dvjEMfecgbWx2FR8oBwwKsX9MXlQ8Q2lvdWgWpwnBQ7LgaHzHcOKeJOqfPkyKrdU"}
                            }
                        }
                    }
                }
            }
        },
        "/organization/people": {
            get: {
                tags: ["Organization"],
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
                                                    "example":"5ff9c1d0236b1f7080d2fde2"
                                                },
                                                "name":{
                                                    "type":"string",
                                                    "example":"Karel Novák"
                                                },
                                                "email":{
                                                    "type":"string",
                                                    "example":"d@d"
                                                },
                                                "lastSeen":{
                                                    "type":"string",
                                                    "example":"2021-02-03T16:12:42.469Z"
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
        "/organization/person/{id}": {
            get: {
                tags: ["Organization"],
                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {
                                    "type":"object",
                                    "properties":{
                                        "_id":{
                                            "type":"string",
                                            "example":"5ff9c1d0236b1f7080d2fde2"
                                        },
                                        "name":{
                                            "type":"string",
                                            "example":"Karel Novák"
                                        },
                                        "email":{
                                            "type":"string",
                                            "example":"d@d"
                                        },
                                        "organizationId":{
                                            "type":"string",
                                            "example":"5ff 9c17a236b1f7080d2fde0"
                                        },
                                        "devices":{
                                            "type":"array",
                                            "items":{
                                                "type":"object",
                                                "properties":{
                                                    "_id":{
                                                        "type":"string",
                                                        "example":"5ffd51c84411eb4b040df3f9"
                                                    },
                                                    "organizationId":{
                                                        "type":"string",
                                                        "example":"5ff9c17a236b1f7080d2fde0"
                                                    },
                                                    "userId":{
                                                        "type":"string",
                                                        "example":"5ff9c1d0236b1f7080d2fde2"
                                                    },
                                                    "mac":{
                                                        "type":"string",
                                                        "example":"58:00:e3:ca:99:01"
                                                    },
                                                    "name":{
                                                        "type":"string",
                                                        "example":"Matěj NTB"
                                                    },
                                                    "lastSeenDate":{
                                                        "type":"string",
                                                        "example":"2021-02-03T16:17:38.858Z"
                                                    }
                                                }
                                            }
                                        },
                                        "lastSeen":{
                                            "type":"string",
                                            "example":"2021-02-03T16:17:38.968Z"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            delete: {
                tags: ["Organization"]
            }
        }
    }
}