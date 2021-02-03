module.exports = {
    definitions: {

    },
    paths: {
        "/img/upload": {
            post: {
                tags: ["Upload"],
                description: "Upload image, send form-data with field \"img\".",
                responses: {
                    200: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "string",
                                    example: "https://img-wifi.puhony.eu/temp/lC5RLywjLM2dqJ8yHlzRg6crN9p3o8zlfHwb0You1612360799384.jpg"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}