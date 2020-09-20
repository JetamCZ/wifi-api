module.exports = {
    swagger: '2.0',
    basePath: '/',
    info: {
        title: 'Wifi localization API',
        version: '1.0.0'
    },
    definitions: {
        Beacon: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'Beacon 18645458646'
                }
            },
            required: ['name']
        }
    },
    paths: {
        "/ping": {
            "get": {
                "tags": ["test"],
                "description": "",
                "summary": "Ping http server",
                "responses": {
                    "200": {
                        "description": "pet response",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "time": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/beacon": {
            post: {
                tags: ["data endpoint"],
                summary: "Entry point for data from beacons"
            }
        }
    }
}