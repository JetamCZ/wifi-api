const db = require('../db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

class UserController {
    constructor() {
        this.model = db.getModel('User')
    }

    async register(inv, user) {
        if(!user.password) {
            throw new Error("user must have password")
        }

        const invitation = await OrganizationController.useCode(inv)

        const newUser = await (new this.model({
            ...user,
            password: await this.generateHash(user.password),
            organizationId: invitation.organizationId,
            settings: {
                language: 'cs'
            }
        }).save())

        const u = await this.model.findById(newUser._id).lean()

        return u
    }

    async login(email, password) {
        const user = await this.model.findOne({email})

        if(user && (await bcrypt.compare(password, user.password))) {
            const organization = await OrganizationController.gerOrgById(user.organizationId)

            return  jwt.sign(
                {
                    user: {
                        _id: user._id,
                        email: user.email,
                        name: user.name
                    },
                    organization: {
                        _id: organization._id,
                        name: organization.name
                    }
                },
                process.env.JWT_TOKEN,
                {
                    "expiresIn": process.env.JWT_EXPIRATION
                }
            )
        } else {
            throw new Error('Wrong email or password')
        }

    }

    async generateHash(password) {
        return await bcrypt.hash(password, 10)
    }

    async getUser(id) {
        const user = await this.model.findById(id).lean()

        return user
    }
}
const OrganizationController = require('../controllers/OrganizationController')


module.exports = new UserController()