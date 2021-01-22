"/devices/{macAddress}": {
parameters: [
{
name: "macAddress",
in: "macAddress",
required: true,
description: "",
schema: {
type: "string"
}
}
],
get: {
tags: ['Devices'],
summary: "get data for mac address",
},
post: {
tags: ['Devices'],
summary: "set device name",
requestBody: {
required: true,
content: {
"application/json": {
schema: {
type: 'object',
required: [
'name'
],
properties: {
'name': {
type: 'string',
example: 'Ant4'
},
}
}
}
}
}
}
},
