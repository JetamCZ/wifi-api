const OrganizationController = require("../../controllers/OrganizationController")

module.exports = {
    post: async (req, res) => {
        try {
            await OrganizationController.validKey(req.body.regKey)

            const org = await OrganizationController.createOrg(req.body.name)

            org.invCode = await OrganizationController.createInvitation(org._id)

            await OrganizationController.useRegKey(req.body.regKey, org._id)

            delete org.__v
            //delete org._id

            res.json(org)
        } catch (e) {
            if (e.message === "INVALID_REG_KEY") {
                res.status(403).json({})
            } else {
                res.status(500).json({})
            }
        }
    },
    get: async (req, res) => {
        /*
            TODO: vymyslet logiku pro generování reg keys
            const code = await OrganizationController.newRegKey()
            res.json(code)
         */
    }
}
