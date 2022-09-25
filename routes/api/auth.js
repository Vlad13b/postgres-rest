const express = require('express')
const router = express.Router()
const guard = require('../../middleware/guard')
const ctrl = require('../../controllers/auth-controllers')


router.post("/register",  ctrl.register)

router.post("/login",  ctrl.login)

router.post("/logout", guard,  ctrl.logout)

module.exports = router