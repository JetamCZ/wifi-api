const db = require('../db')

class UserController {
    constructor() {
        this.model = db.getModel('User')
    }

    async register(user) {
        const newUser = new this.model(user).save()
        return newUser
    }
}