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
                        description: "Úspěšná registrace",
                        content: {
                            "application/json": {
                                schema: {
                                    token: {
                                        type: "string",
                                        example:  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
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