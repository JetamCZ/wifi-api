module.exports = {
    definitions: {

    },
    paths: {
        "/auth/register": {
            post: {
                tags: ["Auth"],
                summary: "Create new user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/definitions/RegisterUser"
                            }
                        }
                    }
                },
                responses: {
                    403: {
                        description: "Nevalidní kód pro registraci."
                    },
                    200: {
                        description: "Úspěšná registrace",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        token: {
                                            type: "string",
                                            example:  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                                        },
                                        user: {
                                            $ref: "#/definitions/BaseUser"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/auth/login": {
            post: {
                tags: ["Auth"],
                summary: "User Login",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["email", "password"],
                                properties: {
                                    email: {
                                        type: "string",
                                        example: "info@puhony.eu"
                                    },
                                    password: {
                                        type: "string",
                                        example: "priliszlutouckykunupeldabelskeody"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Úspěšné přihlášení",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "string",
                                    example:
                                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                                }
                            }
                        }
                    },
                    400: {
                        description: "Špatné uživatelské jméno, nebo heslo"
                    }
                }
            }
        },
        "/auth/verify-code/{code}": {
            parameters: [
                {
                    name: "code",
                    in: "path",
                    required: true,
                    description: "",
                    schema: {
                        type: "string"
                    }
                }
            ],
            get: {
                tags: ["Auth"],
                summary: "Verify registration code",
                responses: {
                    200: {
                        description: "Kód je platný"
                    },
                    403: {
                        description: "Neplatný kód"
                    }
                }
            }
        },
        "/auth/create-org": {
            post: {
                tags: ["Auth"],
                summary: "Create new organization",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                required: ["name", "regKey"],
                                properties: {
                                    name: {
                                        type: "string",
                                        example: "Delta SŠIE",
                                        minLength: 3
                                    },
                                    regKey: {
                                        type: "string",
                                        example: "strfdiqunuhoczcruwez"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Successfull login",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        _id: {
                                            type: "string",
                                            example: "5fcf53f1af1ccc7390ae45df"
                                        },
                                        name: {
                                            type: "string",
                                            example: "Ant4",
                                            minLength: 3
                                        },
                                        invCode: {
                                            type: "string",
                                            example: "lwxrutbNp4O56TZbbKo"
                                        },
                                        created: {
                                            type: "string",
                                            example: "2020-12-08T10:19:50.244Z"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    403: {
                        description: "Neplatný registrační klíč"
                    }
                }
            }
        },
    }
}