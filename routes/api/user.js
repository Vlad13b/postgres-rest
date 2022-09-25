const express = require('express')
const router = express.Router()
const guard = require('../../middleware/guard')
const patchSubscription = require('../../controllers/user-controller')


router.patch("/subscription", guard, patchSubscription)


module.exports = router